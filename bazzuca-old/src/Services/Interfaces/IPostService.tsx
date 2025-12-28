import PostInfo from "@/DTO/Domain/PostInfo";
import PostListPagedResult from "@/DTO/Services/PostListPagedResult";
import PostListResult from "@/DTO/Services/PostListResult";
import PostResult from "@/DTO/Services/PostResult";
import PostSearchParam from "@/DTO/Services/PostSearchParam";
import { IHttpClient, StatusRequest } from "nauth-core";

export default interface IPostService {
    init: (httpClient : IHttpClient) => void;
    listByUser: (month: number, year: number, token: string) => Promise<PostListResult>;
    search: (param: PostSearchParam, token: string) => Promise<PostListPagedResult>;
    getById: (postId: number, token: string) => Promise<PostResult>;
    insert: (post: PostInfo, token: string) => Promise<PostResult>;
    update: (post: PostInfo, token: string) => Promise<PostResult>;
    publish: (postId: number, token: string) => Promise<PostResult>;    
}