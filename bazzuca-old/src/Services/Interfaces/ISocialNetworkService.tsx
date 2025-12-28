import SocialNetworkInfo from "@/DTO/Domain/SocialNetworkInfo";
import SocialNetworkListResult from "@/DTO/Services/SocialNetworkListResult";
import SocialNetworkResult from "@/DTO/Services/SocialNetworkResult";
import { IHttpClient, StatusRequest } from "nauth-core";

export default interface ISocialNetworkService {
    init: (httpClient : IHttpClient) => void;
    listByClient: (clientId: number, token: string) => Promise<SocialNetworkListResult>;
    getById: (networkId: number, token: string) => Promise<SocialNetworkResult>;
    insert: (network: SocialNetworkInfo, token: string) => Promise<SocialNetworkResult>;
    update: (network: SocialNetworkInfo, token: string) => Promise<SocialNetworkResult>;
    delete: (networkId: number, token: string) => Promise<StatusRequest>;
}