import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IFormResponse } from "./formResponse.interface";
import { formResponseFilterableField } from "./formResponse.constant";
import { paginationField } from "../../constant/pagination";
import { FormResponseService } from "./formResponse.service";

const createFormResponse = catchAsync(async (req: Request, res: Response) => {
  const result = await FormResponseService.createFormResponseService(req.body);

  sendResponse<IFormResponse>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created formResponse",
    data: result,
  });
});

const getFormResponse = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, formResponseFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await FormResponseService.getFormResponseService(
    filterData,
    paginationOptions,
  );

  sendResponse<IFormResponse[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get formResponse",
    meta: result.meta,
    data: result.data,
  });
});

const getFormResponseById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FormResponseService.getFormResponseByIdService(id);
  sendResponse<IFormResponse>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get formResponse",
    data: result,
  });
});

const updateFormResponseById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FormResponseService.updateFormResponseByIdService(
      id,
      req.body,
    );
    sendResponse<IFormResponse>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully updated formResponse",
      data: result,
    });
  },
);

const deleteFormResponseById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FormResponseService.deleteFormResponseByIdService(id);
    sendResponse<IFormResponse>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully created formResponse",
      data: result,
    });
  },
);

export const FormResponseController = {
  createFormResponse,
  getFormResponse,
  getFormResponseById,
  updateFormResponseById,
  deleteFormResponseById,
};
