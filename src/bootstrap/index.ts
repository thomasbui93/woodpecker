import { config } from "dotenv";
import getDatabase from "./database";
import setupServer, { afterStartup } from './server';

export default async function bootstrap() {
  config()
  await getDatabase()
  const app = setupServer()
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    afterStartup(port)
  })
}
