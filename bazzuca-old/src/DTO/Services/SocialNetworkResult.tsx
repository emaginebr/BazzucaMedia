import { StatusRequest } from "@/lib/nauth-core";
import SocialNetworkInfo from "../Domain/SocialNetworkInfo";

export default interface SocialNetworkResult extends StatusRequest {
  value? : SocialNetworkInfo;
}