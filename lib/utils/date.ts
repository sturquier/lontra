import { LOCALE } from '@config/locale';

export enum DATE_MODE {
  STORAGE = 'storage',
  DISPLAY = 'display'
}

export const formatDate = (date: Date, mode: DATE_MODE = DATE_MODE.DISPLAY): string => {
  let options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  };

  if (mode === DATE_MODE.STORAGE) {
    options = {
      ...options,
      month: '2-digit',
      day: '2-digit'
    }
  }

  return new Intl.DateTimeFormat(LOCALE, options).format(date);
}

export const isValidDate = (date: Date): boolean => isFinite(+date);

export const removeOrdinalSuffix = (date: string): string => date.replace(/(\d+)(st|nd|rd|th)/, "$1");

export const convertDateMissingYear = (date: string): string => {
  const currentYear = new Date().getFullYear();

  return `${date} ${currentYear}`;
}