import SocialNetworkEnum from "../Enum/SocialNetworkEnum";

export default interface ClientInfo {
    clientId: number;
    userId: number;
    name: string;
    socialNetworks: SocialNetworkEnum[];
}