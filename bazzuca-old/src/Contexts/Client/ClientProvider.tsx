import { useState } from "react";
import IClientProvider from "./IClientProvider";
import ClientFactory from "@/Business/Factory/ClientFactory";
import ClientInfo from "@/DTO/Domain/ClientInfo";
import ClientContext from "./ClientContext";
import { ProviderResult } from "@/lib/nauth-core";

export default function ClientProvider(props: any) {

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    const [client, _setClient] = useState<ClientInfo>(null);
    const [clients, _setClients] = useState<ClientInfo[]>([]);

    const clientProviderValue: IClientProvider = {
        loading: loading,
        loadingUpdate: loadingUpdate,

        client: client,
        setClient: (client: ClientInfo) => {
            _setClient(client);
        },

        clients: clients,
        setClients: (clients: ClientInfo[]) => {
            _setClients(clients);
        },

        listByUser: async () => {
            let ret: Promise<ProviderResult>;
            setLoading(true);
            try {
                let brt = await ClientFactory.ClientBusiness.listByUser();
                if (brt.sucesso) {
                    setLoading(false);
                    _setClients(brt.dataResult);
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

        getById: async (clientId: number) => {
            let ret: Promise<ProviderResult>;
            setLoading(true);
            try {
                let brt = await ClientFactory.ClientBusiness.getById(clientId);
                if (brt.sucesso) {
                    setLoading(false);
                    _setClient(brt.dataResult);
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
        insert: async (client: ClientInfo) => {
            let ret: Promise<ProviderResult>;
            setLoadingUpdate(true);
            try {
                let brt = await ClientFactory.ClientBusiness.insert(client);
                if (brt.sucesso) {
                    setLoadingUpdate(false);
                    _setClient(brt.dataResult);
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

        update: async (client: ClientInfo) => {
            let ret: Promise<ProviderResult>;
            setLoadingUpdate(true);
            try {
                let brt = await ClientFactory.ClientBusiness.update(client);
                if (brt.sucesso) {
                    setLoadingUpdate(false);
                    _setClient(brt.dataResult);
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

        delete: async (clientId: number) => {
            let ret: Promise<ProviderResult>;
            setLoadingUpdate(true);
            try {
                let brt = await ClientFactory.ClientBusiness.delete(clientId);
                if (brt.sucesso) {
                    setLoadingUpdate(false);
                    _setClient(null);
                    return {
                        ...ret,
                        sucesso: true,
                        mensagemSucesso: "User deleted"
                    };
                } else {
                    setLoadingUpdate(false);
                    return {
                        ...ret,
                        sucesso: false,
                        mensagemErro: brt.mensagem
                    };
                }
            } catch (err) {
                setLoadingUpdate(false);
                return {
                    ...ret,
                    sucesso: false,
                    mensagemErro: JSON.stringify(err)
                };
            }
        },
    }

    return (
        <ClientContext.Provider value={clientProviderValue}>
            {props.children}
        </ClientContext.Provider>
    );
}