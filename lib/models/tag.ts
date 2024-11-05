export interface ITag {
  id: string;
  label: string;
}

export type CreateTagPayload = Omit<ITag, 'id'>;