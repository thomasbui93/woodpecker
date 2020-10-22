type ResourceApi<T> = {
  get: (page: number, size: number) => Promise<T[]>,
  create: (entity: Partial<T>) => Promise<T>,
  update: (id: string|number, entity: Partial<T>) => Promise<T>,
  delete: (id: string|number) => Promise<boolean>,
  read: (id: string|number) => Promise<T>
}

export default ResourceApi;
