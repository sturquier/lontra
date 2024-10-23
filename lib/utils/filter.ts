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