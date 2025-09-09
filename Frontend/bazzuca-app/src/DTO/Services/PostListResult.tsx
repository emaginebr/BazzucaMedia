import { StatusRequest } from "@/lib/nauth-core";
import PostInfo from "../Domain/PostInfo";

export default interface PostListResult extends StatusRequest {
  values? : PostInfo[];
}