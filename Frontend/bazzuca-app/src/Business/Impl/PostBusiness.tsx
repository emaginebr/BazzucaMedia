import IPostService from "@/Services/Interfaces/IPostService";
import IPostBusiness from "../Interfaces/IPostBusiness";
import PostInfo from "@/DTO/Domain/PostInfo";
import PostSearchParam from "@/DTO/Services/PostSearchParam";
import PostListPagedInfo from "@/DTO/Domain/PostListPagedInfo";
import { AuthSession, BusinessResult, UserFactory } from "@/lib/nauth-core";

let _PostService: IPostService;

const PostBusiness: IPostBusiness = {
  init: function (PostService: IPostService): void {
    _PostService = PostService;
  },
  listByUser: async (month: number, year: number) => {
    try {
      let ret: BusinessResult<PostInfo[]>;
      let session: AuthSession = UserFactory.UserBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _PostService.listByUser(month, year, session.token);
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
  search: async (param: PostSearchParam) => {
    try {
      let ret: BusinessResult<PostListPagedInfo>;
      let session: AuthSession = UserFactory.UserBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _PostService.search(param, session.token);
      if (retServ.sucesso) {
        
        let postReturn: PostListPagedInfo = {
          posts: retServ.posts,
          pageNum: retServ.pageNum,
          pageCount: retServ.pageCount
        };

        return {
          ...ret,
          dataResult: postReturn,
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
  getById: async (id: number) => {
    try {
      let ret: BusinessResult<PostInfo>;
      let session: AuthSession = UserFactory.UserBusiness.getSession();
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
      let session: AuthSession = UserFactory.UserBusiness.getSession();
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
      let session: AuthSession = UserFactory.UserBusiness.getSession();
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
  },
  publish: async (postId: number) => {
    try {
      let ret: BusinessResult<PostInfo>;
      let session: AuthSession = UserFactory.UserBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _PostService.publish(postId, session.token);
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
  },
}

export default PostBusiness;