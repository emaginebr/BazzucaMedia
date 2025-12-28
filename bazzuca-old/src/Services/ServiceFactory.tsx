import IClientService from './Interfaces/IClientService';
import ClientService from './Impl/ClientService';
import ISocialNetworkService from './Interfaces/ISocialNetworkService';
import SocialNetworkService from './Impl/SocialNetworkService';
import IPostService from './Interfaces/IPostService';
import PostService from './Impl/PostService';
import IImageService from './Interfaces/IImageService';
import ImageService from './Impl/ImageService';
import { HttpClient, IHttpClient } from '@/lib/nauth-core';

const httpClientAuth : IHttpClient = HttpClient();
httpClientAuth.init(import.meta.env.VITE_API_URL);

const clientServiceImpl : IClientService = ClientService;
clientServiceImpl.init(httpClientAuth);

const networkServiceImpl : ISocialNetworkService = SocialNetworkService;
networkServiceImpl.init(httpClientAuth);

const postServiceImpl : IPostService = PostService;
postServiceImpl.init(httpClientAuth);

const imageServiceImpl : IImageService = ImageService;
imageServiceImpl.init(httpClientAuth);

const ServiceFactory = {
  ClientService: clientServiceImpl,
  SocialNetworkService: networkServiceImpl,
  PostService: postServiceImpl,
  ImageService: imageServiceImpl,
  setLogoffCallback: (cb : () => void) => {
    httpClientAuth.setLogoff(cb);
  }
};

export default ServiceFactory;