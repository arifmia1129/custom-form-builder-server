import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import { IFormResponse } from "./formResponse.interface";
import FormResponse from "./formResponse.model";
import { formResponseSearchableField } from "./formResponse.constant";

const createFormResponseService = async (
  department: IFormResponse,
): Promise<IFormResponse | null> => {
  return await FormResponse.create(department);
};

const getFormResponseService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IFormResponse[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: formResponseSearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andCondition.length ? { $and: andCondition } : {};

  const res = await FormResponse.find(whereConditions)
    .populate("form")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await FormResponse.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getFormResponseByIdService = async (
  id: string,
): Promise<IFormResponse | null> => {
  const res = await FormResponse.findById(id);
  return res;
};

const updateFormResponseByIdService = async (
  id: string,
  payload: Partial<IFormResponse>,
): Promise<IFormResponse | null> => {
  const res = await FormResponse.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteFormResponseByIdService = async (
  id: string,
): Promise<IFormResponse | null> => {
  const res = await FormResponse.findByIdAndDelete(id);
  return res;
};

export const FormResponseService = {
  createFormResponseService,
  getFormResponseService,
  getFormResponseByIdService,
  updateFormResponseByIdService,
  deleteFormResponseByIdService,
};
