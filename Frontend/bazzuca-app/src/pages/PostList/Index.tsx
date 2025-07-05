
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
import IClientProvider from "@/Contexts/Client/IClientProvider";
import ClientContext from "@/Contexts/Client/ClientContext";
import SocialNetworkEnum from "@/DTO/Enum/SocialNetworkEnum";


export default function PostList() {

    const navigate = useNavigate();

    const authContext = useContext<IAuthProvider>(AuthContext);
    const clientContext = useContext<IClientProvider>(ClientContext);
    const postContext = useContext<IPostProvider>(PostContext);

    const [clientId, setClientId] = useState<number>(0);
    const [clientName, setClientName] = useState<string>("");
    const [network, setNetwork] = useState<SocialNetworkEnum>(null);

    const searchPost = async (pageNum: number, clientId?: number, network?: SocialNetworkEnum) => {
        let param: PostSearchParam = {
            userId: authContext.sessionInfo.userId,
            clientId: clientId,
            network: network,
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
            let retCli = await clientContext.listByUser();
            if (!retCli.sucesso) {
                toast.error(retCli.mensagemErro);
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
                            <Header
                                clients={clientContext.clients}
                                clientId={clientId}
                                clientName={clientName}
                                network={network}
                                setClientId={setClientId}
                                setClientName={setClientName}
                                setNetwork={setNetwork}
                                filter={async (clientId: number, network: SocialNetworkEnum) => {
                                    setClientId(clientId);
                                    setNetwork(network);
                                    await searchPost(1, clientId, network);
                                }}
                            />
                            <Card className="bg-brand-dark border-brand-gray/30">
                                <CardContent>
                                    <PostTable
                                        loading={postContext.loading}
                                        searchResult={postContext.searchResult}
                                        changePage={(pageNum) => searchPost(pageNum, clientId, network)}
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
