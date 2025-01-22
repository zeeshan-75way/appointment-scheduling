import { DataSource } from "typeorm";
import { User } from "../../users/user.entity";
import { Service } from "../../service/service.entity";
import { Availability } from "../../availability/availability.entity";
import { Appointment } from "../../appointment/appointment.entity";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: "postgres",
  password: "1234",
  database: "appointment-scheduling",
  entities: [User, Service, Availability, Appointment],
  migrations: ["src/migrations/*.ts"],
  synchronize: true,
});
