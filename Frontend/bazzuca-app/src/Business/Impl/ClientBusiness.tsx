import IClientService from "@/Services/Interfaces/IClientService";
import IClientBusiness from "../Interfaces/IClientBusiness";
import ClientInfo from "@/DTO/Domain/ClientInfo";
import { AuthSession, BusinessResult, UserFactory } from "@/lib/nauth-core";

let _clientService: IClientService;

const ClientBusiness: IClientBusiness = {
  init: function (clientService: IClientService): void {
    _clientService = clientService;
  },
  listByUser: async () => {
    try {
      let ret: BusinessResult<ClientInfo[]>;
      let session: AuthSession = UserFactory.UserBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _clientService.listByUser(session.token);
      if (retServ.sucesso) {
        return {
          ...ret,
          dataResult: retServ.values,
          sucesso: true
        };
      } else {
        return {
          ...ret,
          sucesso: false,
          mensagem: retServ.mensagem
        };
      }
    } catch {
      throw new Error("Failed to get user by address");
    }
  },
  getById: async (id: number) => {
    try {
      let ret: BusinessResult<ClientInfo>;
      let session: AuthSession = UserFactory.UserBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _clientService.getById(id, session.token);
      if (retServ.sucesso) {
        return {
          ...ret,
          dataResult: retServ.value,
          sucesso: true
        };
      } else {
        return {
          ...ret,
          sucesso: false,
          mensagem: retServ.mensagem
        };
      }
    } catch {
      throw new Error("Failed to get client by id");
    }
  },
  insert: async (client: ClientInfo) => {
    try {
      let ret: BusinessResult<ClientInfo>;
      let session: AuthSession = UserFactory.UserBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _clientService.insert(client, session.token);
      if (retServ.sucesso) {
        return {
          ...ret,
          dataResult: retServ.value,
          sucesso: true
        };
      } else {
        return {
          ...ret,
          sucesso: false,
          mensagem: retServ.mensagem
        };
      }
    } catch {
      throw new Error("Failed to insert client");
    }
  },
  update: async (client: ClientInfo) => {
    try {
      let ret: BusinessResult<ClientInfo>;
      let session: AuthSession = UserFactory.UserBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _clientService.update(client, session.token);
      if (retServ.sucesso) {
        return {
          ...ret,
          dataResult: retServ.value,
          sucesso: true
        };
      } else {
        return {
          ...ret,
          sucesso: false,
          mensagem: retServ.mensagem
        };
      }
    } catch {
      throw new Error("Failed to update client");
    }
  },
  delete: async (id: number) => {
    try {
      let ret: BusinessResult<boolean>;
      let session: AuthSession = UserFactory.UserBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _clientService.delete(id, session.token);
      if (retServ.sucesso) {
        return {
          ...ret,
          dataResult: retServ.sucesso,
          sucesso: true
        };
      } else {
        return {
          ...ret,
          sucesso: false,
          mensagem: retServ.mensagem
        };
      }
    } catch {
      throw new Error("Failed to delete client");
    }
  }
}

export default ClientBusiness;