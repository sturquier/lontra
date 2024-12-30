import { IArticle } from "@models/article";

import { websiteMock } from "./website";

export const articleMock: IArticle = {
  id: '1',
  title: 'A really good article',
  url: 'https://foo.com/1',
  publicationDate: new Date(),
  website: websiteMock,
  isFavorite: false,
  tags: []
}