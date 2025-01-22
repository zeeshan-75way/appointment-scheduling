import { DataSource } from "typeorm";
import { User } from "../../users/user.entity";
// import { User } from "../entities/User";
// import { Post } from "../entities/Post";

export const AppDataSource = new DataSource({
  type: "postgres", // or "mysql", "sqlite", etc.
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: "postgres",
  password: "1234",
  database: "appointment-scheduling",
  entities: [User],
  migrations: ["src/migrations/*.ts"], // Migrations path
  synchronize: true, // Use migrations for production
});
