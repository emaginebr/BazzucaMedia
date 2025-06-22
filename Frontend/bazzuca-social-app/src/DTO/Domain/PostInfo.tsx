import PostStatusEnum from "../Enum/PostStatusEnum";
import PostTypeEnum from "../Enum/PostTypeEnum";
import ClientInfo from "./ClientInfo";
import SocialNetworkInfo from "./SocialNetworkInfo";

export default interface PostInfo {
    postId: number;
    networkId: number;
    clientId: number;
    scheduleData: string;
    postType: PostTypeEnum;
    s3Key: string;
    title: string;
    status: PostStatusEnum;
    description: string;
    socialNetwork?: SocialNetworkInfo;
    client?: ClientInfo;
}