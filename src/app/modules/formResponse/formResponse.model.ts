import { Schema, model } from "mongoose";
import {
  FormResponseModel,
  IFormResponse,
  IFormResponseMethods,
} from "./formResponse.interface";

export const FormResponseSchema = new Schema<
  IFormResponse,
  FormResponseModel,
  IFormResponseMethods
>(
  {
    form: {
      type: Schema.Types.ObjectId,
      ref: "Form", // Reference to the FormResponse model
      required: true,
    },
    data: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const FormResponse = model<IFormResponse, FormResponseModel>(
  "FormResponse",
  FormResponseSchema,
);

export default FormResponse;
