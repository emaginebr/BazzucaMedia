import IImageBusiness from "../Interfaces/IImageBusiness";
import ImageBusiness from "../Impl/ImageBusiness";
import ServiceFactory from "@/Services/ServiceFactory";

const ImageService = ServiceFactory.ImageService;

const ImageBusinessImpl: IImageBusiness = ImageBusiness;
ImageBusinessImpl.init(ImageService);

const ImageFactory = {
  ImageBusiness: ImageBusinessImpl
};

export default ImageFactory;
