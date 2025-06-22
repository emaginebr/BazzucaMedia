import { StatusRequest } from "nauth-core";
import SocialNetworkInfo from "../Domain/SocialNetworkInfo";

export default interface SocialNetworkListResult extends StatusRequest {
  values? : SocialNetworkInfo[];
}