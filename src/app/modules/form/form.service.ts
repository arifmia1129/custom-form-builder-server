import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import { IForm } from "./form.interface";
import Form from "./form.model";
import { formSearchableField } from "./form.constant";

const createFormService = async (department: IForm): Promise<IForm | null> => {
  return await Form.create(department);
};

const getFormService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IForm[]>> => {
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
      $or: formSearchableField.map(field => ({
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

  const res = await Form.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Form.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getFormByIdService = async (id: string): Promise<IForm | null> => {
  const res = await Form.findById(id);
  return res;
};

const updateFormByIdService = async (
  id: string,
  payload: Partial<IForm>,
): Promise<IForm | null> => {
  const res = await Form.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteFormByIdService = async (id: string): Promise<IForm | null> => {
  const res = await Form.findByIdAndDelete(id);
  return res;
};

export const FormService = {
  createFormService,
  getFormService,
  getFormByIdService,
  updateFormByIdService,
  deleteFormByIdService,
};
