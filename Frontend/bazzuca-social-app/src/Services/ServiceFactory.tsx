import IClientService from './Interfaces/IClientService';
import { HttpClient, IHttpClient } from 'nauth-core';
import ClientService from './Impl/ClientService';
import ISocialNetworkService from './Interfaces/ISocialNetworkService';
import SocialNetworkService from './Impl/SocialNetworkService';
import IPostService from './Interfaces/IPostService';
import PostService from './Impl/PostService';

const httpClientAuth : IHttpClient = HttpClient();
httpClientAuth.init(import.meta.env.VITE_API_URL);

const clientServiceImpl : IClientService = ClientService;
clientServiceImpl.init(httpClientAuth);

const networkServiceImpl : ISocialNetworkService = SocialNetworkService;
networkServiceImpl.init(httpClientAuth);

const postServiceImpl : IPostService = PostService;
postServiceImpl.init(httpClientAuth);

const ServiceFactory = {
  ClientService: clientServiceImpl,
  SocialNetworkService: networkServiceImpl,
  PostService: postServiceImpl,
  setLogoffCallback: (cb : () => void) => {
    httpClientAuth.setLogoff(cb);
  }
};

export default ServiceFactory;