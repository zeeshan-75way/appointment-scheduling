import { body } from "express-validator";

export const creteService = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a Number"),
];

export const updateService = [
  body("name").optional(),
  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("price must be a Number"),
];
