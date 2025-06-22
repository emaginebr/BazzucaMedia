import IPostBusiness from "../Interfaces/IPostBusiness";
import PostBusiness from "../Impl/PostBusiness";
import ServiceFactory from "@/Services/ServiceFactory";

const PostService = ServiceFactory.PostService;

const PostBusinessImpl: IPostBusiness = PostBusiness;
PostBusinessImpl.init(PostService);

const PostFactory = {
  PostBusiness: PostBusinessImpl
};

export default PostFactory;
