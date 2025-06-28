
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PostForm } from "@/pages/Post/PostForm";
import { AuthContext, IAuthProvider } from "nauth-core";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Header from "./Header";
import IPostProvider from "@/Contexts/Post/IPostProvider";
import PostContext from "@/Contexts/Post/PostContext";
import PostTable from "./PostTable";
import PostSearchParam from "@/DTO/Services/PostSearchParam";


export default function PostList() {

    const navigate = useNavigate();

    const authContext = useContext<IAuthProvider>(AuthContext);
    //const clientContext = useContext<IClientProvider>(ClientContext);
    const postContext = useContext<IPostProvider>(PostContext);

    const searchPost = async (pageNum: number) => {
        let param: PostSearchParam = {
            userId: authContext.sessionInfo.userId,
            clientId: null,
            status: null,
            pageNum: pageNum,
        };
        let ret = await postContext.search(param);
        if (!ret.sucesso) {
            toast.error(ret.mensagemErro);
            return;
        }
    };


    useEffect(() => {
        authContext.loadUserSession().then(async (ret) => {
            if (!authContext.sessionInfo) {
                navigate("/login");
                return;
            }
            await searchPost(1);
        })
    }, []);

    return (
        <>
            <SidebarProvider>
                <div className="min-h-screen flex w-full bg-gradient-dark">
                    <AppSidebar />
                    <main className="flex-1">
                        <div className="p-6">
                            <Header />
                            <Card className="bg-brand-dark border-brand-gray/30">
                                <CardContent>
                                    <PostTable
                                        loading={postContext.loading}
                                        searchResult={postContext.searchResult}
                                        changePage={(pageNum) => searchPost(pageNum)}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div >
            </SidebarProvider >
        </>
    );
};
