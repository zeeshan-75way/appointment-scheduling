import * as AvailabilityService from "./availability.service";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AvailabilityService.createAvailability(req.body);
    res.send(createResponse(result, "Slots Created Successfully"));
  }
);

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

export const getStaffAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new Error("staff id is required");
    }
    const result = await AvailabilityService.getStaffAvailability(id);

    res.send(createResponse(result, "All Slots of Staff Fetched Successfully"));
  }
);
