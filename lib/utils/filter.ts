import { IWebsite } from "@models/website";
import { ITag } from "@models/tag";

export type WebsiteFilter = Pick<IWebsite, 'id' | 'name'>;

export type DateFilter = Date | null;

export type FavoriteFilter = boolean;

export type TagFilter = Pick<ITag, 'id' | 'label'>;

export interface IFilters {
  websites: WebsiteFilter[];
  date: DateFilter;
  favorite: FavoriteFilter;
  tags: TagFilter[];
}

export const defaultFilters: IFilters = {
  websites: [],
  date: null,
  favorite: false,
  tags: []
}

export const getActiveFiltersCount = (filters: IFilters): number => {
  let count = 0;

  if (filters.websites.length) count+= filters.websites.length;

  if (filters.date !== null) count ++;

  if (filters.favorite) count ++;

  if (filters.tags.length) count+= filters.tags.length;

  return count;
}