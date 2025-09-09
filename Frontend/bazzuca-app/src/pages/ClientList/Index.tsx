
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PostForm } from "@/pages/Post/PostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import ClientTable from "./ClientTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IClientProvider from "@/Contexts/Client/IClientProvider";
import ClientProvider from "@/Contexts/Client/ClientProvider";
import ClientContext from "@/Contexts/Client/ClientContext";
import { toast } from "sonner";
import Header from "./Header";
import ClientDialog from "./ClientDialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import ClientResult from "@/DTO/Services/ClientResult";
import { IUserProvider, UserContext } from "@/lib/nauth-core";


export default function ClientList() {

    const [isClientOpen, setIsClientOpen] = useState<boolean>(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
    const [isClientInsertMode, setIsClientInsertMode] = useState<boolean>(false);

    const navigate = useNavigate();

    const userContext = useContext<IUserProvider>(UserContext);
    const clientContext = useContext<IClientProvider>(ClientContext);


    useEffect(() => {
        userContext.loadUserSession().then((ret) => {
            if (!userContext.sessionInfo) {
                navigate("/login");
                return;
            }
            clientContext.listByUser().then((retCli) => {
                if (!retCli.sucesso) {
                    toast.error(retCli.mensagemErro);
                    return;
                }
            });
        })
    }, []);

    return (
        <>
            <ConfirmDialog
                isOpen={isConfirmOpen}
                loading={clientContext.loadingUpdate}
                setIsOpen={setIsConfirmOpen}
                onExecute={async () => {
                    let ret = await clientContext.delete(clientContext.client?.clientId);
                    if (!ret.sucesso) {
                        toast.error(ret.mensagemErro);
                        return;
                    }
                    setIsConfirmOpen(false);
                    let retList = await clientContext.listByUser();
                    if (!retList.sucesso) {
                        toast.error(retList.mensagemErro);
                        return;
                    }
                }}
            />
            <ClientDialog
                isOpen={isClientOpen}
                loading={clientContext.loadingUpdate}
                title={isClientInsertMode ? "New Client" : "Edit Client"}
                name={clientContext.client?.name}
                setName={(name) => clientContext.setClient({ ...clientContext.client, name })}
                setIsOpen={setIsClientOpen}
                onSave={async (name) => {
                    let ret: ClientResult;
                    if (isClientInsertMode) {
                        let ret = await clientContext.insert({ ...clientContext.client, name });
                        if (!ret.sucesso) {
                            toast.error(ret.mensagemErro);
                            return;
                        }
                    }
                    else {
                        let ret = await clientContext.update(clientContext.client);
                        if (!ret.sucesso) {
                            toast.error(ret.mensagemErro);
                            return;
                        }
                    }
                    setIsClientOpen(false);
                    let retList = await clientContext.listByUser();
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
                            <Header onNewClientClick={() => {
                                clientContext.setClient(null);
                                setIsClientInsertMode(true);
                                setIsClientOpen(true);
                            }} />
                            <Card className="bg-brand-dark border-brand-gray/30">
                                <CardContent>
                                    <ClientTable
                                        loading={clientContext.loading}
                                        clients={clientContext.clients}
                                        onEdit={(client) => {
                                            clientContext.setClient(client);
                                            setIsClientInsertMode(false);
                                            setIsClientOpen(true);
                                        }}
                                        onDelete={(client) => {
                                            clientContext.setClient(client);
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
