import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  department?:string;
  position?:string;
  isActive: boolean;
  role: "ADMIN" | "USER" | "STAFF";
  refreshToken?: string;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date | "";
}
