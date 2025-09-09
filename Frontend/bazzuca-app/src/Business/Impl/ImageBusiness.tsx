import IImageService from "@/Services/Interfaces/IImageService";
import IImageBusiness from "../Interfaces/IImageBusiness";
import { AuthSession, BusinessResult, UserFactory } from "@/lib/nauth-core";

let _imageService: IImageService;

const ImageBusiness: IImageBusiness = {
  init: function (imageService: IImageService): void {
    _imageService = imageService;
  },
  uploadImage: async (file: Blob, filename: string) => {
    try {
      let ret: BusinessResult<string>;
      let session: AuthSession = UserFactory.UserBusiness.getSession();
      if (!session) {
        return {
          ...ret,
          sucesso: false,
          mensagem: "Not logged"
        };
      }
      let retServ = await _imageService.uploadImage(file, filename, session.token);
      if (retServ.sucesso) {
        return {
          ...ret,
          dataResult: retServ.value,
          sucesso: true
        };
      } else {
        return {
          ...ret,
          sucesso: false,
          mensagem: retServ.mensagem
        };
      }
    } catch {
      throw new Error("Failed to get user by address");
    }
  }
}

export default ImageBusiness;