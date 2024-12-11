export interface IFilters {
  websiteIds: string[];
  date: Date | null;
  favorite: boolean;
  tagIds: string[];
}

export const defaultFilters: IFilters = {
  websiteIds: [],
  date: null,
  favorite: false,
  tagIds: []
}

export const getActiveFiltersCount = (filters: IFilters): number => {
  let count = 0;

  if (filters.websiteIds.length) count+= filters.websiteIds.length;

  if (filters.date !== null) count ++;

  if (filters.favorite) count ++;

  if (filters.tagIds.length) count+= filters.tagIds.length;

  return count;
}