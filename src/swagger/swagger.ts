import userRoute from "./userRoutes.json";
import serviceRoutes from "./serviceRoutes.json";
import availabilityRoutes from "./availabilityRoutes.json";
import appointmentRoutes from "./appointmetRoutes.json";
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Appointment Scheduling App API Documentation",
    version: "1.0.0",
    description: "API documentation for the Appointment scheduling app",
    contact: {
      email: "zeeshan.75way@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development server",
    },
  ],
  paths: {
    ...userRoute,
    ...serviceRoutes,
    ...availabilityRoutes,
    ...appointmentRoutes,
  },
};

export default swaggerDocument;
