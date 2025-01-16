import { body } from "express-validator";

export const createAppointment = [
  body("serviceId")
    .notEmpty()
    .withMessage("serviceId is required")
    .isString()
    .withMessage("serviceId must be a string"),
  body("availabilityId")
    .notEmpty()
    .withMessage("availabilityId is required")
    .isString()
    .withMessage("availabilityId must be a string"),
];
