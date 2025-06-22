import { StatusRequest } from "nauth-core";
import PostInfo from "../Domain/PostInfo";

export default interface PostResult extends StatusRequest {
  value? : PostInfo;
}