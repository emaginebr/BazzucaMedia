import { StatusRequest } from "nauth-core";
import ClientInfo from "../Domain/ClientInfo";

export default interface ClientListResult extends StatusRequest {
  values : ClientInfo[];
}