import { ProviderResult } from "@/lib/nauth-core";
import PostInfo from "../Domain/PostInfo";

export default interface PostProviderResult extends ProviderResult {
    post?: PostInfo;
}