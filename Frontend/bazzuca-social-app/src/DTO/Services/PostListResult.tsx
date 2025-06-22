import { StatusRequest } from "nauth-core";
import PostInfo from "../Domain/PostInfo";

export default interface PostListResult extends StatusRequest {
  values? : PostInfo[];
}