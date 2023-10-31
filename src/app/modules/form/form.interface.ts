import { HydratedDocument, Model } from "mongoose";
type Field = {
  name: string;
  type: string;
  required?: boolean;
  requiredMsg?: string;
  options?: string;
};

export type IForm = {
  title: string;
  description: string;
  headerImgUrl: string;
  fields: Field[];
};

export type IFormMethods = {
  fullName(): string;
};

export type FormModel = {
  createWithFullName(): Promise<HydratedDocument<IForm, IFormMethods>>;
  // name: string,
} & Model<IForm, object, IFormMethods>;
