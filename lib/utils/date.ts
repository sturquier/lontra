import { LOCALE } from "@config/locale";

export const formatDate = (date: Date): string => {  
  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  };

  return new Intl.DateTimeFormat(LOCALE, options).format(date);
}