import { StatusRequest } from "nauth-core";
import SocialNetworkInfo from "../Domain/SocialNetworkInfo";

export default interface SocialNetworkResult extends StatusRequest {
  value? : SocialNetworkInfo;
}