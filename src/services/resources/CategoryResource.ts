import { Repository } from 'typeorm';
import validateBody from '../../helpers/resource_validator';
import getDatabase from '../../bootstrap/database';
import { Category } from '../../entity/Category';
import ResourceApi from './Resource';
import ResourceNotFoundException from '../../exceptions/validation/ResourceNotFoundException';
import { Type } from '../../entity/Type';
import InvalidInputException from '../../exceptions/validation/InvalidInputException';

function fromBody(body: Partial<Category>) {
  const category = new Category();
  category.name = body.name;
  category.description = body.description;
  category.type = body.type;
  return category;
}

async function validate(body: Partial<Category>, typeCategory: Repository<Type>) {
  validateBody(body, ['name', 'description', 'type'], 'Category');
  const entity = body;
  if (entity.type) {
    entity.type = await typeCategory.findOne(entity.type);
    if (!entity.type) throw new InvalidInputException('Category: type is invalid.');
  } else {
    throw new InvalidInputException('Category: type is invalid.');
  }
  return entity;
}

export default async function getCategoryResource(): Promise<ResourceApi<Category>> {
  const categoryRepository = await getDatabase().then((db) => db.getRepository<Category>(Category));
  const typeCategory = await getDatabase().then((db) => db.getRepository<Type>(Type));
  return {
    get(page: number, size: number): Promise<Category[]> {
      return categoryRepository.find({
        take: size,
        skip: page * size,
      });
    },
    async create(body: Partial<Category>): Promise<Category> {
      const cat = await validate(body, typeCategory);
      const category = fromBody(cat);
      await categoryRepository.save(category);
      return category;
    },
    async read(id: string | number): Promise<Category> {
      const category = await categoryRepository.findOne(id);
      if (!category) throw new ResourceNotFoundException('Category not found.');
      await category.type;
      return category;
    },
    async delete(id: string | number): Promise<boolean> {
      await categoryRepository.delete(id);
      return true;
    },
    async update(id: string | number, body: Partial<Category>) : Promise<Category> {
      const cat = await validate(body, typeCategory);
      const category = fromBody(cat);
      await categoryRepository.update(id, category);
      return this.read(id);
    },
  };
}
