import { IHttpClient, StringResult } from "nauth-core";
import IImageService from "../Interfaces/IImageService";

let _httpClient : IHttpClient;

const ImageService : IImageService = {
    init: function (htppClient: IHttpClient): void {
        _httpClient = htppClient;
    },
    uploadImage: async (file: Blob, filename: string, token: string) => {
        let ret: StringResult;

        const formData = new FormData();
        formData.append('file', file, filename);

        //formData.append("networkId", "0");
        let request = await _httpClient.doPostFormDataAuth<StringResult>("/Image/uploadImage", formData, token);
        if (request.success) {
            return request.data;
        }
        else {
            ret = {
                mensagem: request.messageError,
                sucesso: false,
                ...ret
            };
        }
        return ret;
    }
}

export default ImageService;