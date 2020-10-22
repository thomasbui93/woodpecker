import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import routes from '../api';
import exceptionInterceptor from '../middlewares/exception_interceptor';

export function afterStartup(port: any) {
  console.log(`The application has started on port: ${port}`);
}

export default async function setupServer(): Promise<Express> {
  const app: Express = express();
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(compression({
    level: 9,
  }));
  await routes(app);
  app.use(exceptionInterceptor);
  return app;
}
