export enum CRAWLING_STATUS {
  NOT_CRAWLED = 'notCrawled',
  CRAWLING = 'crawling',
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export const extractBackgroundImageUrl = (style?: string): string | undefined => {
  if (style) {
      const match = style.match(/url\(["']?(.*?)["']?\)/);
      return match ? match[1] : undefined;
  }

  return undefined;
}