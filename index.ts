import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import { initDB } from "./src/common/services/database.service";
import errorHandler from "./src/common/middleware/error-handler.middleware";
import routes from "./src/routes";
import { config } from "dotenv";
import cookieParser = require("cookie-parser");
import { IUser } from "./src/users/user.dto";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/swagger/swagger";
import cors from "cors";
import cron from "node-cron";
import { upcomingReminder } from "./src/appointment/appointment.controller";
import { limiter } from "./src/common/helper/rate-limiter";
config();
const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> {}
    interface Request {
      user?: User;
    }
  }
}

const initApp = async (): Promise<void> => {
  // init mongodb
  await initDB();
  app.use(limiter);
  app.use("/api", routes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });
  cron.schedule("0 * * * *", async () => {
    console.log("Sending appointment reminders...");
    await upcomingReminder();
  });
  // error handler
  app.use(errorHandler);
  http.createServer(app).listen(port, () => {
    console.log("Server is running on port", port);
  });
};

void initApp();
