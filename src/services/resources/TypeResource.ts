import validateBody from '../../helpers/resource_validator';
import getDatabase from '../../bootstrap/database';
import { Type } from '../../entity/Type';
import ResourceApi from './Resource';
import ResourceNotFoundException from '../../exceptions/validation/ResourceNotFoundException';

function fromBody(body: Partial<Type>) {
  const type = new Type();
  type.name = body.name;
  type.description = body.description;
  return type;
}

export default async function getTypeResource(): Promise<ResourceApi<Type>> {
  const typeRepository = await getDatabase().then((db) => db.getRepository<Type>(Type));
  return {
    get(page: number, size: number): Promise<Type[]> {
      return typeRepository.find({
        take: size,
        skip: page * size,
      });
    },
    async create(body: Partial<Type>): Promise<Type> {
      validateBody(body, ['name', 'description'], 'Type');
      const type = fromBody(body);
      await typeRepository.save(type);

      return type;
    },
    async read(id: string | number): Promise<Type> {
      const type = await typeRepository.findOne(id);
      if (!type) throw new ResourceNotFoundException('Type not found.');
      return type;
    },
    async delete(id: string | number): Promise<boolean> {
      await typeRepository.delete(id);
      return true;
    },
    async update(id: string | number, body: Partial<Type>) : Promise<Type> {
      const type = fromBody(body);
      await typeRepository.update(id, type);
      return this.read(id);
    },
  };
}
