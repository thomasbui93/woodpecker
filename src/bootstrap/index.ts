import { config } from "dotenv/types";
import getDatabase from "./database";

export default async function bootstrap() {
  config()
  await getDatabase()
}
