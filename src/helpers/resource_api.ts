import {
  NextFunction, Request, Response, Router,
} from 'express';
import { ParsedQs } from 'qs';
import ResourceApi from '../services/resources/Resource';

function getOrElse(query: ParsedQs, key: string, defaultValue: number): number {
  if (query[key]) {
    const result = (query as any)[key];
    if (Number.isNaN(result)) return parseInt(result, 10);
    return defaultValue;
  }

  return defaultValue;
}

function extractPagination(query: ParsedQs) {
  const page = getOrElse(query, 'page', 0);
  const size = getOrElse(query, 'size', 10);

  return {
    page,
    size,
  };
}

export function resourceApi<T>(resource: ResourceApi<T>, namespace: string): Router {
  const router = Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, size } = extractPagination(req.query);
      const entities = await resource.get(page, size);
      // TODO: plural correctly.
      res.status(200).json({
        [`${namespace}s`]: entities,
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entity = await resource.create(req.body);
      res.status(201).json({
        [namespace]: entity,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entity = await resource.read(req.params.id);
      res.status(200).json({
        [namespace]: entity,
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entity = await resource.update(req.params.id, req.body);
      res.status(200).json({
        [namespace]: entity,
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = await resource.delete(req.params.id);
      res.status(200).json({
        status,
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
