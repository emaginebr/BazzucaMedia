import { BusinessResult } from "@/lib/nauth-core";
import IImageService from "@/Services/Interfaces/IImageService";

export default interface IImageBusiness {
  init: (imageService: IImageService) => void;
  uploadImage: (file: Blob, filename: string) => Promise<BusinessResult<string>>;
}