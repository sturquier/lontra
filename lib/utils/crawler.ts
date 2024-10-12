export enum CRAWLING_STATUS {
  NOT_CRAWLED = 'notCrawled',
  CRAWLING = 'crawling',
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export const crawlersPath = '/api/crawlers';

export const articlesBulkInsertionPath = '/api/articles/bulk';