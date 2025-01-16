import { Types } from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";
import { IUser } from "../users/user.dto";

export interface IAppointment extends BaseSchema {
  userId: Types.ObjectId;
  serviceId: Types.ObjectId;
  availabilityId: Types.ObjectId;
  date: Date;
  startTime: Date;
  status: "BOOKED" | "CANCELLED" | "RESCHEDULED";
}
