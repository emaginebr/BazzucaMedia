import { StatusRequest } from "@/lib/nauth-core";
import PostInfo from "../Domain/PostInfo";

export default interface PostResult extends StatusRequest {
  value? : PostInfo;
}