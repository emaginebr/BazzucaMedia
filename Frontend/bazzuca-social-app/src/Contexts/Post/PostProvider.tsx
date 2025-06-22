import { useState } from "react";
import IPostProvider from "./IPostProvider";
import { ProviderResult } from "nauth-core";
import PostFactory from "@/Business/Factory/PostFactory";
import PostInfo from "@/DTO/Domain/PostInfo";
import PostContext from "./PostContext";

export default function PostProvider(props: any) {

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    const [post, _setPost] = useState<PostInfo>(null);
    const [posts, _setPosts] = useState<PostInfo[]>([]);

    const PostProviderValue: IPostProvider = {
        loading: loading,
        loadingUpdate: loadingUpdate,

        post: post,
        setPost: (post: PostInfo) => {
            _setPost(post);
        },

        posts: posts,
        setPosts: (posts: PostInfo[]) => {
            _setPosts(posts);
        },

        listByUser: async () => {
            let ret: Promise<ProviderResult>;
            setLoading(true);
            try {
                let brt = await PostFactory.PostBusiness.listByUser();
                if (brt.sucesso) {
                    setLoading(false);
                    _setPosts(brt.dataResult);
                    return {
                        ...ret,
                        sucesso: true,
                        mensagemSucesso: "User load"
                    };
                }
                else {
                    setLoading(false);
                    return {
                        ...ret,
                        sucesso: false,
                        mensagemErro: brt.mensagem
                    };
                }
            }
            catch (err) {
                setLoading(false);
                return {
                    ...ret,
                    sucesso: false,
                    mensagemErro: JSON.stringify(err)
                };
            }
        },

        getById: async (PostId: number) => {
            let ret: Promise<ProviderResult>;
            setLoading(true);
            try {
                let brt = await PostFactory.PostBusiness.getById(PostId);
                if (brt.sucesso) {
                    setLoading(false);
                    _setPost(brt.dataResult);
                    return {
                        ...ret,
                        sucesso: true,
                        mensagemSucesso: "User load"
                    };
                }
                else {
                    setLoading(false);
                    return {
                        ...ret,
                        sucesso: false,
                        mensagemErro: brt.mensagem
                    };
                }
            }
            catch (err) {
                setLoading(false);
                return {
                    ...ret,
                    sucesso: false,
                    mensagemErro: JSON.stringify(err)
                };
            }
        },
        insert: async (Post: PostInfo) => {
            let ret: Promise<ProviderResult>;
            setLoadingUpdate(true);
            try {
                let brt = await PostFactory.PostBusiness.insert(Post);
                if (brt.sucesso) {
                    setLoadingUpdate(false);
                    _setPost(brt.dataResult);
                    return {
                        ...ret,
                        sucesso: true,
                        mensagemSucesso: "User load"
                    };
                }
                else {
                    setLoadingUpdate(false);
                    return {
                        ...ret,
                        sucesso: false,
                        mensagemErro: brt.mensagem
                    };
                }
            }
            catch (err) {
                setLoadingUpdate(false);
                return {
                    ...ret,
                    sucesso: false,
                    mensagemErro: JSON.stringify(err)
                };
            }
        },

        update: async (Post: PostInfo) => {
            let ret: Promise<ProviderResult>;
            setLoadingUpdate(true);
            try {
                let brt = await PostFactory.PostBusiness.update(Post);
                if (brt.sucesso) {
                    setLoadingUpdate(false);
                    _setPost(brt.dataResult);
                    return {
                        ...ret,
                        sucesso: true,
                        mensagemSucesso: "User load"
                    };
                }
                else {
                    setLoadingUpdate(false);
                    return {
                        ...ret,
                        sucesso: false,
                        mensagemErro: brt.mensagem
                    };
                }
            }
            catch (err) {
                setLoadingUpdate(false);
                return {
                    ...ret,
                    sucesso: false,
                    mensagemErro: JSON.stringify(err)
                };
            }
        }
    }

    return (
        <PostContext.Provider value={PostProviderValue}>
            {props.children}
        </PostContext.Provider>
    );
}