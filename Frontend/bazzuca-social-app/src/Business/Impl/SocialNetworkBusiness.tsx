import ISocialNetworkService from "@/Services/Interfaces/ISocialNetworkService";
import ISocialNetworkBusiness from "../Interfaces/ISocialNetworkBusiness";
import SocialNetworkInfo from "@/DTO/Domain/SocialNetworkInfo";
import { AuthFactory, AuthSession, BusinessResult } from "nauth-core";

let _SocialNetworkService: ISocialNetworkService;

const SocialNetworkBusiness: ISocialNetworkBusiness = {
  init: function (SocialNetworkService: ISocialNetworkService): void {
    _SocialNetworkService = SocialNetworkService;
  },
  listByClient: async (clientId: number) => {
    try {
      let ret: BusinessResult<SocialNetworkInfo[]>;
      let session: AuthSession = AuthFactory.AuthBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _SocialNetworkService.listByClient(clientId, session.token);
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
      let ret: BusinessResult<SocialNetworkInfo>;
      let session: AuthSession = AuthFactory.AuthBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _SocialNetworkService.getById(id, session.token);
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
      throw new Error("Failed to get SocialNetwork by id");
    }
  },
  insert: async (SocialNetwork: SocialNetworkInfo) => {
    try {
      let ret: BusinessResult<SocialNetworkInfo>;
      let session: AuthSession = AuthFactory.AuthBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _SocialNetworkService.insert(SocialNetwork, session.token);
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
      throw new Error("Failed to insert SocialNetwork");
    }
  },
  update: async (SocialNetwork: SocialNetworkInfo) => {
    try {
      let ret: BusinessResult<SocialNetworkInfo>;
      let session: AuthSession = AuthFactory.AuthBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _SocialNetworkService.update(SocialNetwork, session.token);
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
      throw new Error("Failed to update SocialNetwork");
    }
  },
  delete: async (id: number) => {
    try {
      let ret: BusinessResult<boolean>;
      let session: AuthSession = AuthFactory.AuthBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _SocialNetworkService.delete(id, session.token);
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
      throw new Error("Failed to delete SocialNetwork");
    }
  }
}

export default SocialNetworkBusiness;