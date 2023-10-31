import { Schema, model } from "mongoose";
import { FormModel, IForm, IFormMethods } from "./form.interface";

export const FormSchema = new Schema<IForm, FormModel, IFormMethods>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    headerImgUrl: {
      type: String,
      required: true,
    },
    fields: [
      {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        required: {
          type: Boolean,
        },
        requiredMsg: {
          type: String,
        },
        options: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Form = model<IForm, FormModel>("Form", FormSchema);

export default Form;
