import { type IService } from "./service.dto";
import { Schema, model } from "mongoose";

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IService>("Service", ServiceSchema);
