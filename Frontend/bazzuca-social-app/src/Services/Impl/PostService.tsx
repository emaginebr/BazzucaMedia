import PostListResult from "@/DTO/Services/PostListResult";
import PostResult from "@/DTO/Services/PostResult";
import { IHttpClient, StatusRequest } from "nauth-core";
import IPostService from "../Interfaces/IPostService";
import PostInfo from "@/DTO/Domain/PostInfo";

let _httpPost : IHttpClient;

const PostService : IPostService = {
    init: function (htppPost: IHttpClient): void {
        _httpPost = htppPost;
    },
    listByUser: async (token: string) => {
        let ret: PostListResult;
        let request = await _httpPost.doGetAuth<PostListResult>("/Post/listByUser", token);
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
    getById: async (PostId: number, token: string) => {
        let ret: PostResult;
        let request = await _httpPost.doGetAuth<PostResult>("/Post/getById/" + PostId, token);
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
    insert: async (Post: PostInfo, token: string) => {
        let ret: PostResult;
        let request = await _httpPost.doPostAuth<PostResult>("/Post/insert", Post, token);
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
    update: async (Post: PostInfo, token: string) => {
        let ret: PostResult;
        let request = await _httpPost.doPostAuth<PostResult>("/Post/update", Post, token);
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
    }
}

export default PostService;