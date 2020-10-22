import validateBody from '../../helpers/resource_validator';
import getDatabase from '../../bootstrap/database';
import { Type } from '../../entity/Type';
import ResourceApi from './Resource';

const fromBody = function (body: Partial<Type>) {
  const type = new Type();
  type.name = body.name;
  type.description = body.description;
  return type;
};

export default async function getTypeResource(): Promise<ResourceApi<Type>> {
  const typeRepository = await getDatabase().then((db) => db.getRepository<Type>(Type));
  return {
    get(page: number, size: number): Promise<Type[]> {
      return typeRepository.find({
        take: page,
        skip: page * size,
      });
    },
    async create(body: Partial<Type>): Promise<Type> {
      validateBody(body, ['name', 'description'], 'Type');
      const type = fromBody(body);
      await typeRepository.save(type);

      return type;
    },
    read(id: string | number): Promise<Type> {
      return typeRepository.findOne(id);
    },
    async delete(id: string | number): Promise<boolean> {
      const { affected } = await typeRepository.delete(id);
      return affected >= 1;
    },
    async update(id: string | number, body: Partial<Type>) : Promise<Type> {
      const type = fromBody(body);
      await typeRepository.update(id, type);
      return typeRepository.findOne(id);
    },
  };
}
