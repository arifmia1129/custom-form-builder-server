/* eslint-disable no-undefined */
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { ICloudinaryResponse } from "../shared/interface/common";
import config from "../config";
import { Express } from "express";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadToCloudinary = async (
  file: Express.Multer.File,
): Promise<ICloudinaryResponse | undefined> => {
  try {
    const result = await new Promise<ICloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error: Error, result: ICloudinaryResponse) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(file.buffer);
    });

    return result;
  } catch (error) {
    return undefined;
  }
};

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
};
