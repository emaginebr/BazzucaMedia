
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
import NetworkTable from "./NetworkTable";
import ISocialNetworkProvider from "@/Contexts/SocialNetwork/ISocialNetworkProvider";
import SocialNetworkContext from "@/Contexts/SocialNetwork/SocialNetworkContext";
import NetworkDialog from "./NetworkDialog";
import SocialNetworkResult from "@/DTO/Services/SocialNetworkResult";


export default function ClientDetail() {

    const [isNetworkOpen, setIsNetworkOpen] = useState<boolean>(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
    const [isNetworkInsertMode, setIsNetworkInsertMode] = useState<boolean>(false);

    const navigate = useNavigate();

    const { clientId } = useParams<{ clientId: string }>();

    const authContext = useContext<IAuthProvider>(AuthContext);
    const clientContext = useContext<IClientProvider>(ClientContext);
    const networkContext = useContext<ISocialNetworkProvider>(SocialNetworkContext);


    useEffect(() => {
        networkContext.setNetworks([]);
        authContext.loadUserSession().then((ret) => {
            if (!authContext.sessionInfo) {
                navigate("/login");
                return;
            }
            clientContext.getById(parseInt(clientId)).then((retCli) => {
                if (!retCli.sucesso) {
                    toast.error(retCli.mensagemErro);
                    return;
                }
                networkContext.listByClient(parseInt(clientId)).then((retNet) => {
                    if (!retNet.sucesso) {
                        toast.error(retNet.mensagemErro);
                        return;
                    }
                });
            });
        })
    }, []);

    return (
        <>
            <NetworkDialog
                isOpen={isNetworkOpen}
                loading={networkContext.loadingUpdate}
                title={isNetworkInsertMode ? "New Social Network" : "Edit Social Network"}

                network={networkContext.network}
                setNetwork={networkContext.setNetwork}

                setIsOpen={setIsNetworkOpen}
                onSave={async (network) => {
                    let ret: SocialNetworkResult;
                    if (isNetworkInsertMode) {
                        network = {
                            ...network,
                            networkId: 0,
                            clientId: parseInt(clientId),
                        };
                        let ret = await networkContext.insert(network);
                        if (!ret.sucesso) {
                            toast.error(ret.mensagemErro);
                            return;
                        }
                    }
                    else {
                        let ret = await networkContext.update(network);
                        if (!ret.sucesso) {
                            toast.error(ret.mensagemErro);
                            return;
                        }
                    }
                    setIsNetworkOpen(false);
                    let retList = await networkContext.listByClient(parseInt(clientId));
                    if (!retList.sucesso) {
                        toast.error(retList.mensagemErro);
                        return;
                    }
                }}
            />
            <ConfirmDialog
                isOpen={isConfirmOpen}
                loading={networkContext.loadingUpdate}
                setIsOpen={setIsConfirmOpen}
                onExecute={async () => {
                    let ret = await networkContext.delete(networkContext.network?.networkId);
                    if (!ret.sucesso) {
                        toast.error(ret.mensagemErro);
                        return;
                    }
                    setIsConfirmOpen(false);
                    let retList = await networkContext.listByClient(parseInt(clientId));
                    if (!retList.sucesso) {
                        toast.error(retList.mensagemErro);
                        return;
                    }
                }}
            />
            <SidebarProvider>
                <div className="min-h-screen flex w-full bg-gradient-dark">
                    <AppSidebar />
                    <main className="flex-1">
                        <div className="p-6">
                            <Header
                                client={clientContext.client}
                                onNewNetworkClick={() => {
                                    networkContext.setNetwork(null);
                                    setIsNetworkInsertMode(true);
                                    setIsNetworkOpen(true);
                                }} />
                            <Card className="bg-brand-dark border-brand-gray/30">
                                <CardContent>
                                    <NetworkTable
                                        loading={networkContext.loading}
                                        networks={networkContext.networks}
                                        onEdit={(network) => {
                                            networkContext.setNetwork(network);
                                            setIsNetworkInsertMode(false);
                                            setIsNetworkOpen(true);
                                        }}
                                        onDelete={(network) => {
                                            networkContext.setNetwork(network);
                                            setIsConfirmOpen(true);
                                        }}
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
