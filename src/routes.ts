import { Router } from "express";
import userRoutes from "./users/user.routes";
import serviceRoutes from "./service/service.routes";
import availabilityRoutes from "./availability/availability.routes";
import appointmentRoutes from "./appointment/appointment.routes";
const router = Router();

router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/availability", availabilityRoutes);
router.use("/appointment", appointmentRoutes);

export default router;
