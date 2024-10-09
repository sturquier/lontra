import { crawlAngularBlog } from "./crawlers/angularBlog"
import { crawlOctoTalks } from "./crawlers/octoTalks"

export enum CRAWLING_STATUS {
  NOT_CRAWLED = 'notCrawled',
  CRAWLING = 'crawling',
  SUCCESS = 'success',
  FAILURE = 'failure'
}

// TODO:  improve
export const crawlersFactory = (websiteName: string): () => void => {
  if (websiteName === 'Angular') return crawlAngularBlog;
  if (websiteName === 'Octo') return crawlOctoTalks;

  return (() => {});
}