import SocialNetworkEnum from "../Enum/SocialNetworkEnum";

export default interface SocialNetworkInfo {
    networkId: number;
    clientId: number;
    network: SocialNetworkEnum;
    url: string;
    user: string;
    password: string;
}