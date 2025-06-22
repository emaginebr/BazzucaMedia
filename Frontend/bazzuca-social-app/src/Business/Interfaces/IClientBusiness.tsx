import ClientInfo from "@/DTO/Domain/ClientInfo";
import IClientService from "@/Services/Interfaces/IClientService";
import { BusinessResult } from "nauth-core";

export default interface IClientBusiness {
  init: (clientService: IClientService) => void;
  listByUser: () => Promise<BusinessResult<ClientInfo[]>>;
  getById: (clientId: number) => Promise<BusinessResult<ClientInfo>>;
  insert: (client: ClientInfo) => Promise<BusinessResult<ClientInfo>>;
  update: (client: ClientInfo) => Promise<BusinessResult<ClientInfo>>;
  delete: (clientId: number) => Promise<BusinessResult<boolean>>;
}