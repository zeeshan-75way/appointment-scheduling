import { Router } from "express";
import * as AvailabilityValidation from "./availability.validation";
import * as AvailabilityController from "./availability.controllers";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { limiter } from "../common/helper/rate-limiter";
const router = Router();

router
  .post(
    "/",
    limiter,
    roleAuth(["STAFF"]),
    AvailabilityValidation.createAvailability,
    catchError,
    AvailabilityController.createAvailability
  )
  .post("/get-all", limiter, AvailabilityController.getAllAvailability)
  .get("/:id", AvailabilityController.getStaffAvailability);

export default router;
