import IClientBusiness from "../Interfaces/IClientBusiness";
import ClientBusiness from "../Impl/ClientBusiness";
import ServiceFactory from "@/Services/ServiceFactory";

const clientService = ServiceFactory.ClientService;

const clientBusinessImpl: IClientBusiness = ClientBusiness;
clientBusinessImpl.init(clientService);

const ClientFactory = {
  ClientBusiness: clientBusinessImpl
};

export default ClientFactory;
