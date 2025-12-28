import PostInfo from "./PostInfo";

export default interface PostListPagedInfo {
  posts? : PostInfo[];
  pageNum: number;
  pageCount: number;
}