import PostInfo from "@/DTO/Domain/PostInfo";
import { ProviderResult } from "nauth-core";

interface IPostProvider {
    loading: boolean;
    loadingUpdate: boolean;
    
    post: PostInfo;
    setPost: (post: PostInfo) => void;

    posts: PostInfo[];
    setPosts: (posts: PostInfo[]) => void;

    listByUser: () => Promise<ProviderResult>;
    getById: (postId: number) => Promise<ProviderResult>;
    insert: (post: PostInfo) => Promise<ProviderResult>;
    update: (post: PostInfo) => Promise<ProviderResult>;
}

export default IPostProvider;