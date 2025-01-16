import { BaseSchema } from "../common/dto/base.dto";

export interface IService extends BaseSchema {
  name: string;
  description: string;
  price: number;
}
