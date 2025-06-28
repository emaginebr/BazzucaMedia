import PostStatusEnum from "../Enum/PostStatusEnum";

export default interface PostSearchParam {
  userId: number;
  clientId?: number;
  status?: PostStatusEnum;
  pageNum: number;
}