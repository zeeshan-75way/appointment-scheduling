import * as ServiceService from "./service.service";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

/**
 * Creates a new service.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const createService = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ServiceService.createService(req.body);
    res.send(createResponse(result, "Service Created Successfully"));
  }
);
/**
 * Retrieves all services in the database.
 * @function
 * @name getAllServices
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const getAllServices = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ServiceService.getAllServices();
    res.send(createResponse(result, "Services Fetched Successfully"));
  }
)

/**
 * Retrieves a service by id.
 * @function
 * @name getServiceById
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const getServiceById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ServiceService.getServiceById(req.params.id);
    res.send(createResponse(result, "Service Fetched Successfully"));
  }
)

/**
 * Updates a service by id.
 * @function
 * @name updateService
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const updateService = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ServiceService.updateService(req.params.id, req.body);
    res.send(createResponse(result, "Service Updated Successfully"));
  }
)

/**
 * Deletes a service by id.
 * @function
 * @name deleteService
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const deleteService = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ServiceService.deleteService(req.params.id);
    res.send(createResponse(result, "Service Deleted Successfully"));
  }
)
