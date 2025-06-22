import ISocialNetworkBusiness from "../Interfaces/ISocialNetworkBusiness";
import SocialNetworkBusiness from "../Impl/SocialNetworkBusiness";
import ServiceFactory from "@/Services/ServiceFactory";

const SocialNetworkService = ServiceFactory.SocialNetworkService;

const socialNetworkBusinessImpl: ISocialNetworkBusiness = SocialNetworkBusiness;
socialNetworkBusinessImpl.init(SocialNetworkService);

const SocialNetworkFactory = {
  SocialNetworkBusiness: socialNetworkBusinessImpl
};

export default SocialNetworkFactory;
