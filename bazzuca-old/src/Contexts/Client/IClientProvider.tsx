import ClientInfo from "@/DTO/Domain/ClientInfo";
import { ProviderResult } from "@/lib/nauth-core";

interface IClientProvider {
    loading: boolean;
    loadingUpdate: boolean;
    
    client: ClientInfo;
    setClient: (client: ClientInfo) => void;

    clients: ClientInfo[];
    setClients: (clients: ClientInfo[]) => void;

    listByUser: () => Promise<ProviderResult>;
    getById: (clientId: number) => Promise<ProviderResult>;
    insert: (client: ClientInfo) => Promise<ProviderResult>;
    update: (client: ClientInfo) => Promise<ProviderResult>;
    delete: (clientId: number) => Promise<ProviderResult>;
}

export default IClientProvider;