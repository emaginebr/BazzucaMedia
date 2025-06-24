import IImageService from "@/Services/Interfaces/IImageService";
import { BusinessResult } from "nauth-core";

export default interface IImageBusiness {
  init: (imageService: IImageService) => void;
  uploadImage: (file: Blob, filename: string) => Promise<BusinessResult<string>>;
}