import { Dispatch, SetStateAction } from "react";

import { IWebsite } from "@models/website";
import { ITag } from "@models/tag";
import { formatDate } from "./date";

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

export interface IFilterAsChip {
  label: string;
  onDelete: () => void;
} 

export const getFiltersAsChips = (filters: IFilters, setFilters: Dispatch<SetStateAction<IFilters>>): IFilterAsChip[] => {
  const chips: IFilterAsChip[] = [];

  if (filters.websites.length) {
    filters.websites.forEach((website: WebsiteFilter) => {
      chips.push({
        label: website.name,
        onDelete: (): void => {
          const newWebsites = filters.websites.filter(websiteFilter => websiteFilter.id !== website.id);
          setFilters({ ...filters, websites: newWebsites });
        }
      });
    });
  }
  
  if (filters.date) {
    chips.push({
      label: formatDate(filters.date),
      onDelete: (): void => setFilters({ ...filters, date: null })
    });
  }

  if (filters.favorite) {
    chips.push({
      label: 'Favorites only',
      onDelete: (): void => setFilters({ ...filters, favorite: false })
    });
  }

  if (filters.tags.length) {
    filters.tags.forEach((tag: TagFilter) => {
      chips.push({
        label: tag.label,
        onDelete: (): void => {
          const newTags = filters.tags.filter(t => t.id !== tag.id);
          setFilters({ ...filters, tags: newTags });
        }
      });
    });
  }

  return chips;
}
