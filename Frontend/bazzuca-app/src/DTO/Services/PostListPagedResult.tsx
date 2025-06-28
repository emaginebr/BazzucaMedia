import { StatusRequest } from "nauth-core";
import PostInfo from "../Domain/PostInfo";

export default interface PostListPagedResult extends StatusRequest {
  posts? : PostInfo[];
  pageNum: number;
  pageCount: number;
}