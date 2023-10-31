import { Router } from "express";
import { FileUploadHelper } from "../../../utils/uploader";
import { FileController } from "./file.controller";

const router = Router();

router.post(
  "/upload",
  FileUploadHelper.upload.single("file"),
  FileController.uploadFile,
);

export const FileRouter = router;
