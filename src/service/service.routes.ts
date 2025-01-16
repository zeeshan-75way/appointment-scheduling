import { Router } from "express";
import * as ServiceValidation from "./service.validation";
import * as ServiceController from "./service.controller";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";

const router = Router();

router
  .post(
    "/",
    roleAuth(["ADMIN"]),
    ServiceValidation.creteService,
    catchError,
    ServiceController.createService
  )
  .get("/", ServiceController.getAllServices)
  .get("/:id", roleAuth(["ADMIN"]), ServiceController.getServiceById)
  .put(
    "/:id",
    roleAuth(["ADMIN"]),
    ServiceValidation.updateService,
    catchError,
    ServiceController.updateService
  )
  .delete("/:id", roleAuth(["ADMIN"]), ServiceController.deleteService);

export default router;
