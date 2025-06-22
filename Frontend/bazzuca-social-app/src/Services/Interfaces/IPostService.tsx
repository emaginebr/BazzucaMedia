import PostInfo from "@/DTO/Domain/PostInfo";
import PostListResult from "@/DTO/Services/PostListResult";
import PostResult from "@/DTO/Services/PostResult";
import { IHttpClient, StatusRequest } from "nauth-core";

export default interface IPostService {
    init: (httpClient : IHttpClient) => void;
    listByUser: (token: string) => Promise<PostListResult>;
    getById: (postId: number, token: string) => Promise<PostResult>;
    insert: (post: PostInfo, token: string) => Promise<PostResult>;
    update: (post: PostInfo, token: string) => Promise<PostResult>;
}