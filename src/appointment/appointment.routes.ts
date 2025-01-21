import { Router } from "express";
import * as AppointmentValidation from "./appointment.validation";
import * as AppointmentController from "./appointment.controller";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { limiter } from "../common/helper/rate-limiter";
const router = Router();

router
  .post(
    "/",
    limiter,
    roleAuth(["ADMIN", "STAFF", "USER"]),
    AppointmentValidation.createAppointment,
    catchError,
    AppointmentController.bookAppointment
  )
  .patch(
    "/reschedule",
    limiter,
    roleAuth(["ADMIN", "USER"]),
    AppointmentController.rescheduleAppointment
  )
  .patch(
    "/:id",
    limiter,
    roleAuth(["ADMIN", "STAFF", "USER"]),
    AppointmentController.cancelAppointment
  )
  .get(
    "/",
    roleAuth(["ADMIN", "USER"]),
    AppointmentController.getUserAppointments
  );

export default router;
