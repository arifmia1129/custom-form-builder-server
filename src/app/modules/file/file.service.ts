/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICloudinaryResponse } from "../../../shared/interface/common";
import { FileUploadHelper } from "../../../utils/uploader";

const uploadFile = async (file: any) => {
  const res: ICloudinaryResponse | undefined =
    await FileUploadHelper.uploadToCloudinary(file);

  return res;
};

export const FileService = { uploadFile };
