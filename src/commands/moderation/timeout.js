const {
  PermissionFlagsBits,
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");
const ms = require("ms");

module.exports = {
  disabled: true,
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Restrict a members ability to communicate.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((options) =>
      options
        .setName("target")
        .setDescription("Select a member.")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("duration")
        .setDescription("The Duration of the Tiemout")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("reason")
        .setDescription("Reason for this timeout")
        .setMaxLength(512)
    ),
  //devOnly: false,
  //testOnly: false,
  permissions: ["ModerateMembers"],
  botPermissions: ["ModerateMembers"],
  /**
   *
   * @param {Client} interaction
   * @param {ChatInputCommandInteraction} client
   * @returns
   */
  execute: async (client, interaction) => {
    const { options, guild, member, user } = interaction;

    const target = options.getMember("target");
    const duration = options.getString("duration");
    const reason = options.getString("reason") || "No reason specified.";

    const errorsArray = [];

    const errorEmbed = new EmbedBuilder()
      .setAuthor({ name: "Could not timeout member due to" })
      .setColor(client.config.colors.Good);

    if (!target)
      return interaction.reply({
        embeds: [
          errorEmbed.setDescription("Member has most likely left the server.")
        ],
        ephemeral: true
      });

    if (!ms(duration) || ms(duration) > ms("28d"))
      errorsArray.push("Time provided is invalid or over the 28d limit.");

    if (!target.moderatable || !target.manageable)
      errorsArray.push("Selected target is not moderatable by this bot.");

    if (member.roles.highest.position < target.roles.highest.position)
      errorsArray.push("Selected target has a higher role position than you.");

    if (errorsArray.length) {
      interaction.reply({
        embeds: [errorEmbed.setDescription(errorsArray.join("\n"))],
        ephemeral: true
      });
      return;
    }

    try {
      await target.timeout(ms(duration), reason);
    } catch (error) {
      interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            "Could not timeout member due to an unknown error."
          )
        ],
        ephemeral: true
      });
      throw error;
    }

    const newInfractionObject = {
      Issuer: member.id,
      IssuerTag: user.tag,
      Reason: reason,
      Date: Date.now
    };

    let userData = await infractions.findOne({
      Guild: guild.id,
      User: target.id
    });

    if (!userData) {
      userData = await infractions.create({
        Guild: guild.id,
        User: target.id,
        Infractions: [newInfractionObject]
      });
    } else {
      userData.Infractions.push(newInfractionObject) && (await userData.save());
    }

    const sEmbed = new EmbedBuilder()
      .setAuthor({ name: "Timeout Issues", iconURL: guild.iconURL() })
      .setColor(client.config.colors.Good)
      .setDescription(
        [
          `${target} was issued a timeout for **${ms(ms(duration), {
            long: true
          })}** by ${member}`,
          `\nBringing their total infractions to **${userData.Infractions.length} points**`,
          `\n**Reason :** ${reason}`
        ].join("\n")
      );

    return interaction.reply({ embeds: [sEmbed] });
  }
};
