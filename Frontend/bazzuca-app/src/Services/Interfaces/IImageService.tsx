import { IHttpClient, StringResult } from "nauth-core";

export default interface IImageService {
    init: (httpClient : IHttpClient) => void;
    uploadImage: (file: Blob, filename: string, token: string) => Promise<StringResult>;
}