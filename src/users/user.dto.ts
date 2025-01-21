import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
  name: string;
  email: string;
  password: string;
  department?:string;
  position?:string;
  role: "ADMIN" | "USER" | "STAFF";
  refreshToken?: string;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date | "";
}
