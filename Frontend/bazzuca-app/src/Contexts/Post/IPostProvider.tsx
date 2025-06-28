import PostProviderResult from "@/DTO/Context/PostProviderResult";
import PostInfo from "@/DTO/Domain/PostInfo";
import PostListPagedInfo from "@/DTO/Domain/PostListPagedInfo";
import PostSearchParam from "@/DTO/Services/PostSearchParam";
import { ProviderResult } from "nauth-core";

interface IPostProvider {
    loading: boolean;
    loadingUpdate: boolean;
    
    post: PostInfo;
    setPost: (post: PostInfo) => void;

    posts: PostInfo[];
    setPosts: (posts: PostInfo[]) => void;

    searchResult: PostListPagedInfo;

    imageUrl: string;
    setImageUrl: (url: string) => void;

    listByUser: (month: number, year: number) => Promise<ProviderResult>;
    search: (param: PostSearchParam) => Promise<ProviderResult>;
    getById: (postId: number) => Promise<PostProviderResult>;
    insert: (post: PostInfo) => Promise<ProviderResult>;
    update: (post: PostInfo) => Promise<ProviderResult>;
    uploadImage: (file: Blob, filename: string) => Promise<ProviderResult>;
    publish: (postId: number) => Promise<ProviderResult>;
}

export default IPostProvider;