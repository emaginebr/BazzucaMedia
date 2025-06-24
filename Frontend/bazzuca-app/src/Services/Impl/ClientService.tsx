import ClientListResult from "@/DTO/Services/ClientListResult";
import ClientResult from "@/DTO/Services/ClientResult";
import { IHttpClient, StatusRequest } from "nauth-core";
import IClientService from "../Interfaces/IClientService";
import ClientInfo from "@/DTO/Domain/ClientInfo";

let _httpClient : IHttpClient;

const ClientService : IClientService = {
    init: function (htppClient: IHttpClient): void {
        _httpClient = htppClient;
    },
    listByUser: async (token: string) => {
        let ret: ClientListResult;
        let request = await _httpClient.doGetAuth<ClientListResult>("/Client/listByUser", token);
        if (request.success) {
            return request.data;
        }
        else {
            ret = {
                mensagem: request.messageError,
                sucesso: false,
                ...ret
            };
        }
        return ret;
    },
    getById: async (clientId: number, token: string) => {
        let ret: ClientResult;
        let request = await _httpClient.doGetAuth<ClientResult>("/Client/getById/" + clientId, token);
        if (request.success) {
            return request.data;
        }
        else {
            ret = {
                mensagem: request.messageError,
                sucesso: false,
                ...ret
            };
        }
        return ret;
    },
    insert: async (client: ClientInfo, token: string) => {
        let ret: ClientResult;
        let request = await _httpClient.doPostAuth<ClientResult>("/Client/insert", client, token);
        if (request.success) {
            return request.data;
        } else {
            ret = {
                mensagem: request.messageError,
                sucesso: false,
                ...ret
            };
        }
        return ret;
    },
    update: async (client: ClientInfo, token: string) => {
        let ret: ClientResult;
        let request = await _httpClient.doPostAuth<ClientResult>("/Client/update", client, token);
        if (request.success) {
            return request.data;
        } else {
            ret = {
                mensagem: request.messageError,
                sucesso: false,
                ...ret
            };
        }
        return ret;
    },
    delete: async (clientId: number, token: string) => {
        let ret: StatusRequest;
        let request = await _httpClient.doGetAuth<StatusRequest>("/Client/delete/" + clientId, token);
        if (request.success) {
            return request.data;
        } else {
            ret = {
                mensagem: request.messageError,
                sucesso: false,
                ...ret
            };
        }
        return ret;
    },
}

export default ClientService;