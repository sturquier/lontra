export interface ICategory {
  id: string;
  name: string;
}

export type CreateCategoryPayload = Omit<ICategory, 'id'>;