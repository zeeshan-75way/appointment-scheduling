import { body } from "express-validator";

export const createAvailability = [
  body("staffId")
    .notEmpty()
    .withMessage("staffId is required")
    .isString()
    .withMessage("staffId must be a string"),
  body("date")
    .notEmpty()
    .withMessage("date is required")
    .isString()
    .withMessage("date must be a string"),
  body("startTime")
    .notEmpty()
    .withMessage("startTime is required")
    .isString()
    .withMessage("startTime must be a string"),
  body("endTime")
    .notEmpty()
    .withMessage("endTime is required")
    .isString()
    .withMessage("endTime must be a string"),
];
