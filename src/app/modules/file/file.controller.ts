import { Request, Response } from "express";
import { FileService } from "./file.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { IUploadFile } from "../../../shared/interface/common";

const uploadFile = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as IUploadFile;
  const result = await FileService.uploadFile(file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully uploaded file",
    data: result,
  });
});

export const FileController = {
  uploadFile,
};
