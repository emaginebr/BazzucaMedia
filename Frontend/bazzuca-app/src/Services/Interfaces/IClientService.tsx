import ClientInfo from "@/DTO/Domain/ClientInfo";
import ClientListResult from "@/DTO/Services/ClientListResult";
import ClientResult from "@/DTO/Services/ClientResult";
import { IHttpClient, StatusRequest } from "@/lib/nauth-core";

export default interface IClientService {
    init: (httpClient : IHttpClient) => void;
    listByUser: (token: string) => Promise<ClientListResult>;
    getById: (clientId: number, token: string) => Promise<ClientResult>;
    insert: (client: ClientInfo, token: string) => Promise<ClientResult>;
    update: (client: ClientInfo, token: string) => Promise<ClientResult>;
    delete: (clientId: number, token: string) => Promise<StatusRequest>;
}