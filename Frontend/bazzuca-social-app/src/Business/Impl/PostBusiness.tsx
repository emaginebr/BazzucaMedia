import IPostService from "@/Services/Interfaces/IPostService";
import IPostBusiness from "../Interfaces/IPostBusiness";
import PostInfo from "@/DTO/Domain/PostInfo";
import { AuthFactory, AuthSession, BusinessResult } from "nauth-core";

let _PostService: IPostService;

const PostBusiness: IPostBusiness = {
  init: function (PostService: IPostService): void {
    _PostService = PostService;
  },
  listByUser: async () => {
    try {
      let ret: BusinessResult<PostInfo[]>;
      let session: AuthSession = AuthFactory.AuthBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _PostService.listByUser(session.token);
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
      let ret: BusinessResult<PostInfo>;
      let session: AuthSession = AuthFactory.AuthBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _PostService.getById(id, session.token);
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
      throw new Error("Failed to get Post by id");
    }
  },
  insert: async (Post: PostInfo) => {
    try {
      let ret: BusinessResult<PostInfo>;
      let session: AuthSession = AuthFactory.AuthBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _PostService.insert(Post, session.token);
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
      throw new Error("Failed to insert Post");
    }
  },
  update: async (Post: PostInfo) => {
    try {
      let ret: BusinessResult<PostInfo>;
      let session: AuthSession = AuthFactory.AuthBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _PostService.update(Post, session.token);
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
      throw new Error("Failed to update Post");
    }
  }
}

export default PostBusiness;