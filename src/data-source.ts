import { DataSource } from "typeorm";
import { config } from "dotenv";
import { join } from "path";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, "/**/*.entity{.js,.ts}")],
  migrations: [join(__dirname, "/migrations/*{.js,.ts}")],
  synchronize: true,
  logging: false,
});
