// For LavalinkPlayer to transform requester object
export interface Requester {
	id: string;
	username: string;
	discriminator?: string;
	avatarURL?: string;
}
