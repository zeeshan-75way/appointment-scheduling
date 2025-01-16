import { Schema, model } from "mongoose";
import { type IAppointment } from "./appointment.dto";

const AppointmentSchema = new Schema<IAppointment>(
  {
    availabilityId: {
      type: Schema.Types.ObjectId,
      ref: "Availability",
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["BOOKED", "CANCELLED", "RESCHEDULED"],
    },
    date: {
      type: Date,
    },
    startTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default model<IAppointment>("Appointment", AppointmentSchema);
