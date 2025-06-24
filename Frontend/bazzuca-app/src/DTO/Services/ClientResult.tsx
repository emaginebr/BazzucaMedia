import { StatusRequest } from "nauth-core";
import ClientInfo from "../Domain/ClientInfo";

export default interface ClientResult extends StatusRequest {
  value? : ClientInfo;
}