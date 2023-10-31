import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IForm } from "./form.interface";
import { formFilterableField } from "./form.constant";
import { paginationField } from "../../constant/pagination";
import { FormService } from "./form.service";

const createForm = catchAsync(async (req: Request, res: Response) => {
  const result = await FormService.createFormService(req.body);

  sendResponse<IForm>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created form",
    data: result,
  });
});

const getForm = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, formFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await FormService.getFormService(
    filterData,
    paginationOptions,
  );

  sendResponse<IForm[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get form",
    meta: result.meta,
    data: result.data,
  });
});

const getFormById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FormService.getFormByIdService(id);
  sendResponse<IForm>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get form",
    data: result,
  });
});

const updateFormById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FormService.updateFormByIdService(id, req.body);
  sendResponse<IForm>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated form",
    data: result,
  });
});

const deleteFormById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FormService.deleteFormByIdService(id);
  sendResponse<IForm>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully created form",
    data: result,
  });
});

export const FormController = {
  createForm,
  getForm,
  getFormById,
  updateFormById,
  deleteFormById,
};
