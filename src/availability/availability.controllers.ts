import * as AvailabilityService from "./availability.service";
import * as UserService from "../users/user.service";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { IUser } from "../users/user.dto";

/**
 * Creates availability slots for a given staff member.
 * @function
 * @name createAvailability
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const createAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req.user as IUser)._id;
    const user = await UserService.getUserById(userId);
    if (!user) {
      throw new Error("Staff not Found");
    }
    const result = await AvailabilityService.createAvailability(req.body,userId);
    res.send(createResponse(result, "Slots Created Successfully"));
  }
);

/**
 * Retrieves all available slots that match the given filter.
 * @function
 * @name getAllAvailability
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const getAllAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const { startTime, date } = req.body;
    const filter: any = {};
    let queryDate: Date;
    if (date) {
      filter.date = { $gte: date };
    }
    if (startTime) {
      filter.startTime = { $gte: startTime };
    }
    const result = await AvailabilityService.getAllAvailability(filter);
    res.send(createResponse(result, "All Slots Fetched Successfully"));
  }
);

/**
 * Retrieves all available slots for a given staff member.
 * @function
 * @name getStaffAvailability
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const getStaffAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new Error("staff id is required");
    }
    const result = await AvailabilityService.getStaffAvailability(id);

    res.send(
      createResponse(result, "All Slots of Staff Fetched Successfully")
    );
  }
);

