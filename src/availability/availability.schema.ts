import { Schema, model } from "mongoose";
import { type IAvailability } from "./availability.dto";

const AvailabilitySchema = new Schema<IAvailability>(
  {
    staffId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IAvailability>("Availability", AvailabilitySchema);
