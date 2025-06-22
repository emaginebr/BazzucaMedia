import SocialNetworkInfo from "@/DTO/Domain/SocialNetworkInfo";
import ISocialNetworkService from "@/Services/Interfaces/ISocialNetworkService";
import { BusinessResult } from "nauth-core";

export default interface ISocialNetworkBusiness {
  init: (networkService: ISocialNetworkService) => void;
  listByClient: (clientId: number) => Promise<BusinessResult<SocialNetworkInfo[]>>;
  getById: (networkId: number) => Promise<BusinessResult<SocialNetworkInfo>>;
  insert: (network: SocialNetworkInfo) => Promise<BusinessResult<SocialNetworkInfo>>;
  update: (network: SocialNetworkInfo) => Promise<BusinessResult<SocialNetworkInfo>>;
  delete: (networkId: number) => Promise<BusinessResult<boolean>>;
}