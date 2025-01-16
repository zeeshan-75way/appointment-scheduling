import { Router } from "express";
import * as AvailabilityValidation from "./availability.validation";
import * as AvailabilityController from "./availability.controllers";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
const router = Router();

router
  .post(
    "/",
    AvailabilityValidation.createAvailability,
    catchError,
    AvailabilityController.createAvailability
  )
  .post("/get-all", AvailabilityController.getAllAvailability)
  .get("/:id", AvailabilityController.getStaffAvailability);

export default router;
