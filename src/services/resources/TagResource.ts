import validateBody from '../../helpers/resource_validator';
import getDatabase from '../../bootstrap/database';
import { Tag } from '../../entity/Tag';
import ResourceApi from './Resource';
import ResourceNotFoundException from '../../exceptions/validation/ResourceNotFoundException';

function fromBody(body: Partial<Tag>) {
  const tag = new Tag();
  tag.name = body.name;
  tag.description = body.description;
  return tag;
}

export default async function getTagResource(): Promise<ResourceApi<Tag>> {
  const tagRepository = await getDatabase().then((db) => db.getRepository<Tag>(Tag));
  return {
    get(page: number, size: number): Promise<Tag[]> {
      return tagRepository.find({
        take: size,
        skip: page * size,
      });
    },
    async create(body: Partial<Tag>): Promise<Tag> {
      validateBody(body, ['name', 'description'], 'Tag');
      const tag = fromBody(body);
      await tagRepository.save(tag);

      return tag;
    },
    async read(id: string | number): Promise<Tag> {
      const tag = await tagRepository.findOne(id);
      if (!tag) throw new ResourceNotFoundException('Tag not found.');
      return tag;
    },
    async delete(id: string | number): Promise<boolean> {
      await tagRepository.delete(id);
      return true;
    },
    async update(id: string | number, body: Partial<Tag>) : Promise<Tag> {
      const tag = fromBody(body);
      await tagRepository.update(id, tag);
      return this.read(id);
    },
  };
}
