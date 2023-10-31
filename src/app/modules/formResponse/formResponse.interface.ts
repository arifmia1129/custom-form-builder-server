import { HydratedDocument, Model, Types } from "mongoose";
import { IForm } from "../form/form.interface";
type Data = {
  name: string;
  value: string;
};

export type IFormResponse = {
  form: Types.ObjectId | IForm;
  data: Data[];
};

export type IFormResponseMethods = {
  fullName(): string;
};

export type FormResponseModel = {
  createWithFullName(): Promise<
    HydratedDocument<IFormResponse, IFormResponseMethods>
  >;
  // name: string,
} & Model<IFormResponse, object, IFormResponseMethods>;
