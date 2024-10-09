'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useFetchArticlesQuery } from '@store/features/articles/articles.query';
import { Card, Loader } from '@components/index';
import { IArticle } from '@models/article';
import { VIEW_MODE } from '@utils/card';
import './page.scss';

export default function Home() {
  const [mode, setMode] = useState<VIEW_MODE>(VIEW_MODE.LIST);

  const { data: articles, isFetching } = useFetchArticlesQuery();

  const articlesClassName: string = `home-articles ${mode === VIEW_MODE.LIST ? 'home-articles-list' : 'home-articles-grid'}`

  const switchRowClassName = (selectedMode: VIEW_MODE): string => `home-title-switch-row ${mode === selectedMode ? 'home-title-switch-row-selected' : ''}`

  return (
      <main className='home'>
        <div className='home-title'>
          <h1>HOME</h1>
          <div className='home-title-switch'>
            <div className={switchRowClassName(VIEW_MODE.GRID)} onClick={(): void => setMode(VIEW_MODE.GRID)}>
              <Image
                src={mode === VIEW_MODE.GRID ? "/icons/grid-active.svg" : "/icons/grid.svg"}
                alt='Grid icon'
                width={20}
                height={20}
              />
              <span>GRID</span>
            </div>
            <div className={switchRowClassName(VIEW_MODE.LIST)} onClick={(): void => setMode(VIEW_MODE.LIST)}>
              <Image
                src={mode === VIEW_MODE.LIST ? "/icons/list-active.svg" : "/icons/list.svg"}
                alt='List icon'
                width={20}
                height={20}
              />
              <span>LIST</span>
            </div>
          </div>
        </div>
        {isFetching ? (
          <Loader />
        ) : (
          <div className={articlesClassName}>
            {articles?.map((article: IArticle, index: number) => (
              <Card key={index} article={article} />
            ))}
          </div>
        )}
      </main>
  );
}
