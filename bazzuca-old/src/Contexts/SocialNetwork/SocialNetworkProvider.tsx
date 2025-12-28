import { useState } from "react";
import ISocialNetworkProvider from "./ISocialNetworkProvider";
import SocialNetworkFactory from "@/Business/Factory/SocialNetworkFactory";
import SocialNetworkInfo from "@/DTO/Domain/SocialNetworkInfo";
import SocialNetworkContext from "./SocialNetworkContext";
import { ProviderResult } from "@/lib/nauth-core";

export default function SocialNetworkProvider(props: any) {

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    const [network, _setNetwork] = useState<SocialNetworkInfo>(null);
    const [networks, _setNetworks] = useState<SocialNetworkInfo[]>([]);

    const SocialNetworkProviderValue: ISocialNetworkProvider = {
        loading: loading,
        loadingUpdate: loadingUpdate,

        network: network,
        setNetwork: (SocialNetwork: SocialNetworkInfo) => {
            _setNetwork(SocialNetwork);
        },

        networks: networks,
        setNetworks: (networks: SocialNetworkInfo[]) => {
            _setNetworks(networks);
        },

        listByClient: async (clientId: number) => {
            let ret: Promise<ProviderResult>;
            _setNetworks([]);
            setLoading(true);
            try {
                let brt = await SocialNetworkFactory.SocialNetworkBusiness.listByClient(clientId);
                if (brt.sucesso) {
                    setLoading(false);
                    _setNetworks(brt.dataResult);
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

        getById: async (SocialNetworkId: number) => {
            let ret: Promise<ProviderResult>;
            setLoading(true);
            try {
                let brt = await SocialNetworkFactory.SocialNetworkBusiness.getById(SocialNetworkId);
                if (brt.sucesso) {
                    setLoading(false);
                    _setNetwork(brt.dataResult);
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
        insert: async (SocialNetwork: SocialNetworkInfo) => {
            let ret: Promise<ProviderResult>;
            setLoadingUpdate(true);
            try {
                let brt = await SocialNetworkFactory.SocialNetworkBusiness.insert(SocialNetwork);
                if (brt.sucesso) {
                    setLoadingUpdate(false);
                    _setNetwork(brt.dataResult);
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

        update: async (SocialNetwork: SocialNetworkInfo) => {
            let ret: Promise<ProviderResult>;
            setLoadingUpdate(true);
            try {
                let brt = await SocialNetworkFactory.SocialNetworkBusiness.update(SocialNetwork);
                if (brt.sucesso) {
                    setLoadingUpdate(false);
                    _setNetwork(brt.dataResult);
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

        delete: async (SocialNetworkId: number) => {
            let ret: Promise<ProviderResult>;
            setLoadingUpdate(true);
            try {
                let brt = await SocialNetworkFactory.SocialNetworkBusiness.delete(SocialNetworkId);
                if (brt.sucesso) {
                    setLoadingUpdate(false);
                    _setNetwork(null);
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
        <SocialNetworkContext.Provider value={SocialNetworkProviderValue}>
            {props.children}
        </SocialNetworkContext.Provider>
    );
}