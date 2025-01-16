import { Types } from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";

export interface IAvailability extends BaseSchema {
  staffId: Types.ObjectId;
  date: Date;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}
