import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import * as fs from "fs";
import { ICloudinaryResponse, IUploadFile } from "../shared/interface/common";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: "dg2ibc23a",
  api_key: "326747289144147",
  api_secret: "2IF7uGWOq5IkRBHnWHVN2-7Y-BM",
});

const uploadToCloudinary = async (
  file: IUploadFile,
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
};
