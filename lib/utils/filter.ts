export interface IFilters {
  websiteIds: string[];
  date: Date | null;
  favorite: boolean;
}

export const defaultFilters: IFilters = {
  websiteIds: [],
  date: null,
  favorite: false
}

export const getActiveFiltersCount = (filters: IFilters): number => {
  let count = 0;

  if (filters.websiteIds.length) count++;

  if (filters.date !== null) count ++;

  if (filters.favorite) count ++;

  return count;
}