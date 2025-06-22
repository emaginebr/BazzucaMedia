import PostInfo from "@/DTO/Domain/PostInfo";
import IPostService from "@/Services/Interfaces/IPostService";
import { BusinessResult } from "nauth-core";

export default interface IPostBusiness {
  init: (PostService: IPostService) => void;
  listByUser: () => Promise<BusinessResult<PostInfo[]>>;
  getById: (PostId: number) => Promise<BusinessResult<PostInfo>>;
  insert: (Post: PostInfo) => Promise<BusinessResult<PostInfo>>;
  update: (Post: PostInfo) => Promise<BusinessResult<PostInfo>>;
}