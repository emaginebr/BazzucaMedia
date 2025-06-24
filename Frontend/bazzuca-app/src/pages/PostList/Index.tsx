
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PostForm } from "@/pages/Post/PostForm";
import { AuthContext, IAuthProvider } from "nauth-core";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IClientProvider from "@/Contexts/Client/IClientProvider";
import ClientProvider from "@/Contexts/Client/ClientProvider";
import ClientContext from "@/Contexts/Client/ClientContext";
import { toast } from "sonner";
import Header from "./Header";
import ConfirmDialog from "@/components/ConfirmDialog";
import ClientResult from "@/DTO/Services/ClientResult";
import IPostProvider from "@/Contexts/Post/IPostProvider";
import PostContext from "@/Contexts/Post/PostContext";
import PostTable from "./PostTable";


export default function PostList() {

    const navigate = useNavigate();

    const authContext = useContext<IAuthProvider>(AuthContext);
    const clientContext = useContext<IClientProvider>(ClientContext);
    const postContext = useContext<IPostProvider>(PostContext);


    useEffect(() => {
        authContext.loadUserSession().then((ret) => {
            if (!authContext.sessionInfo) {
                navigate("/login");
                return;
            }
            postContext.listByUser().then((retPost) => {
                if (!retPost.sucesso) {
                    toast.error(retPost.mensagemErro);
                    return;
                }
            });
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
                                        posts={postContext.posts}
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
