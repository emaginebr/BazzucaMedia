import PostStatusEnum from "../Enum/PostStatusEnum";
import SocialNetworkEnum from "../Enum/SocialNetworkEnum";

export default interface PostSearchParam {
  userId: number;
  clientId?: number;
  network?: SocialNetworkEnum;
  status?: PostStatusEnum;
  pageNum: number;
}