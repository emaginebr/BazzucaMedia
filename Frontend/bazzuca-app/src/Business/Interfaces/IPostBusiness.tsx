import PostInfo from "@/DTO/Domain/PostInfo";
import PostListPagedInfo from "@/DTO/Domain/PostListPagedInfo";
import PostSearchParam from "@/DTO/Services/PostSearchParam";
import IPostService from "@/Services/Interfaces/IPostService";
import { BusinessResult } from "nauth-core";

export default interface IPostBusiness {
  init: (PostService: IPostService) => void;
  listByUser: (month: number, year: number) => Promise<BusinessResult<PostInfo[]>>;
  search: (param: PostSearchParam) => Promise<BusinessResult<PostListPagedInfo>>;
  getById: (PostId: number) => Promise<BusinessResult<PostInfo>>;
  insert: (Post: PostInfo) => Promise<BusinessResult<PostInfo>>;
  update: (Post: PostInfo) => Promise<BusinessResult<PostInfo>>;
  publish: (PostId: number) => Promise<BusinessResult<PostInfo>>;
}