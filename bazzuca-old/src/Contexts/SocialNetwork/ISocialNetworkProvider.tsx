import SocialNetworkInfo from "@/DTO/Domain/SocialNetworkInfo";
import { ProviderResult } from "nauth-core";

interface ISocialNetworkProvider {
    loading: boolean;
    loadingUpdate: boolean;
    
    network: SocialNetworkInfo;
    setNetwork: (network: SocialNetworkInfo) => void;

    networks: SocialNetworkInfo[];
    setNetworks: (networks: SocialNetworkInfo[]) => void;

    listByClient: (clientId: number) => Promise<ProviderResult>;
    getById: (networkId: number) => Promise<ProviderResult>;
    insert: (network: SocialNetworkInfo) => Promise<ProviderResult>;
    update: (network: SocialNetworkInfo) => Promise<ProviderResult>;
    delete: (networkId: number) => Promise<ProviderResult>;
}

export default ISocialNetworkProvider;