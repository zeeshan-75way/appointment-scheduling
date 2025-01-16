import { Router } from "express";
import * as AppointmentValidation from "./appointment.validation";
import * as AppointmentController from "./appointment.controller";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
const router = Router();

router
  .post(
    "/",
    roleAuth(["ADMIN", "STAFF", "USER"]),
    AppointmentValidation.createAppointment,
    catchError,
    AppointmentController.bookAppointment
  )
  .patch(
    "/reschedule",
    roleAuth(["ADMIN", "USER"]),
    AppointmentController.rescheduleAppointment
  )
  .patch(
    "/:id",
    roleAuth(["ADMIN", "STAFF", "USER"]),
    AppointmentController.cancelAppointment
  )
  .get(
    "/",
    roleAuth(["ADMIN", "USER"]),
    AppointmentController.getUserAppointments
  );

export default router;
