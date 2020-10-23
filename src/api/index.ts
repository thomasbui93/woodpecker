import { Express } from 'express';
import getTypeResource from '../services/resources/TypeResource';
import getCategoryResource from '../services/resources/CategoryResource';
import { resourceApi } from '../helpers/resource_api';
import healthCheckController from './health';

export default async function routes(app: Express) {
  const TypeResource = await getTypeResource();
  const CategoryResource = await getCategoryResource();

  app.use('/z/ping', healthCheckController);
  app.use('/api/types', resourceApi(TypeResource, 'type'));
  app.use('/api/categories', resourceApi(CategoryResource, 'cat'));
}
