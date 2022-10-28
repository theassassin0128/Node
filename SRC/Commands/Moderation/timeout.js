const {
    Client,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder,
    EmbedBuilder,
    MembershipScreeningFieldType
} = require("discord.js");
const DataBase = require("../../Schemas/infractions.js");
const ms = require("ms");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Restrict a members ability to communicate.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(options => options
        .setName("target")
        .setDescription("Select a member.")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("duration")
        .setDescription("The Duration of the Tiemout")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("reason")
        .setDescription("Reason for this timeout")
        .setMaxLength(512)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute: async(interaction, client) => {
        const {options, guild, member, user} = interaction;

        const target = options.getMember("target");
        const duration = options.getString("duration");
        const reason = options.getString("reason") || "No reason specified.";

        const errorsArray = [];

        const errorEmbed = new EmbedBuilder()
        .setAuthor({name: "Could not timeout member due to"})
        .setColor("Red")

        if(!target) return interaction.reply({
            embeds: [errorEmbed.setDescription("Member has most likely left the guild.")],
            ephemeral: true
        });

        if(!ms(duration) || ms(duration) > ms("28d"))
        errorsArray.push("Time provided is invalid or over the 28d limit.");

        if(!target.moderatable || !target.manageable)
        errorsArray.push("Selected target is not moderatable by this bot.");

        if(member.roles.highest.position < target.roles.highest.position)
        errorsArray.push("Selected target has a higher role position than you.");

        if(errorsArray.length)
        return interaction.reply({
            embeds: [errorEmbed.setDescription(errorsArray.join("\n"))],
            ephemeral: true
        });

        try {
            await target.timeout(ms(duration), reason);
        } catch (err) {
            interaction.reply({
                embeds: [errorEmbed.setDescription("Could not timeout member due to an unknown error.")],
                ephemeral: true
            });
            console.error(err)
        };

        const newInfractionObject = {
            Issuer: member.id,
            IssuerTag: user.tag,
            Reason: reason,
            Date: Date.now
        }

        let userData = await DataBase.findOne({Guild: guild.id, User: target.id});
        
        if(!userData) {
            userData = await DataBase.create({Guild: guild.id, User: target.id, Infractions: [newInfractionObject]});
        } else {
            userData.Infractions.push(newInfractionObject) && await userData.save();
        };

        const sEmbed = new EmbedBuilder()
        .setAuthor({name: "Timeout Issues", iconURL: guild.iconURL()})
        .setColor("Gold")
        .setDescription([
            `${target} was issued a timeout for **${ms(ms(duration), {long: true})}** by ${member}`,
            `bringing their total infractions to **${userData.Infractions.length} points**`,
            `\nReason : ${reason}`
        ].join("\n"));

        return interaction.reply({embeds: [sEmbed]});
    }
};