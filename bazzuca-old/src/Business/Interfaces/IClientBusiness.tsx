import ClientInfo from "@/DTO/Domain/ClientInfo";
import { BusinessResult } from "@/lib/nauth-core";
import IClientService from "@/Services/Interfaces/IClientService";

export default interface IClientBusiness {
  init: (clientService: IClientService) => void;
  listByUser: () => Promise<BusinessResult<ClientInfo[]>>;
  getById: (clientId: number) => Promise<BusinessResult<ClientInfo>>;
  insert: (client: ClientInfo) => Promise<BusinessResult<ClientInfo>>;
  update: (client: ClientInfo) => Promise<BusinessResult<ClientInfo>>;
  delete: (clientId: number) => Promise<BusinessResult<boolean>>;
}