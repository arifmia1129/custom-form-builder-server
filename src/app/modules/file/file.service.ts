import {
  ICloudinaryResponse,
  IUploadFile,
} from "../../../shared/interface/common";
import { FileUploadHelper } from "../../../utils/uploader";

const uploadFile = async (file: IUploadFile) => {
  const res: ICloudinaryResponse | undefined =
    await FileUploadHelper.uploadToCloudinary(file);

  return res;
};

export const FileService = { uploadFile };
