import ISocialNetworkService from "../Interfaces/ISocialNetworkService";
import SocialNetworkListResult from "@/DTO/Services/SocialNetworkListResult";
import SocialNetworkResult from "@/DTO/Services/SocialNetworkResult";
import SocialNetworkInfo from "@/DTO/Domain/SocialNetworkInfo";
import { IHttpClient, StatusRequest } from "@/lib/nauth-core";

let _httpClient : IHttpClient;

const SocialNetworkService : ISocialNetworkService = {
    init: function (htppClient: IHttpClient): void {
        _httpClient = htppClient;
    },
    listByClient: async (clientId: number, token: string) => {
        let ret: SocialNetworkListResult;
        let request = await _httpClient.doGetAuth<SocialNetworkListResult>("/SocialNetwork/listByClient/" + clientId, token);
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
    getById: async (networkId: number, token: string) => {
        let ret: SocialNetworkResult;
        let request = await _httpClient.doGetAuth<SocialNetworkResult>("/SocialNetwork/getById/" + networkId, token);
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
    insert: async (network: SocialNetworkInfo, token: string) => {
        let ret: SocialNetworkResult;
        let request = await _httpClient.doPostAuth<SocialNetworkResult>("/SocialNetwork/insert", network, token);
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
    update: async (network: SocialNetworkInfo, token: string) => {
        let ret: SocialNetworkResult;
        let request = await _httpClient.doPostAuth<SocialNetworkResult>("/SocialNetwork/update", network, token);
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
    delete: async (networkId: number, token: string) => {
        let ret: StatusRequest;
        let request = await _httpClient.doGetAuth<StatusRequest>("/SocialNetwork/delete/" + networkId, token);
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

export default SocialNetworkService;