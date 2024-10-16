'use client';

import { useState } from 'react';

import { useFetchArticlesQuery } from '@store/features/articles/articles.query';
import { Button, Card, Loader, Toggle } from '@components/index';
import { IArticle } from '@models/article';
import { VIEW_MODE } from '@utils/card';
import './page.scss';

export default function Home() {
  const [mode, setMode] = useState<VIEW_MODE>(VIEW_MODE.LIST);

  const { data: articles, isFetching } = useFetchArticlesQuery();

  const articlesClassName: string = `home-content-articles ${mode === VIEW_MODE.LIST ? 'home-content-articles-list' : 'home-content-articles-grid'}`

  return (
      <main className='home'>
        <h1>Home</h1>
        {isFetching ? (
          <Loader fullPage />
        ) : (
          <div className='home-content'>
            <div className='home-content-filters'>
              <Button
                icon={{
                  src: '/icons/filter.svg',
                  alt: 'Filter icon'
                }}
                onClickCallback={(): void => console.log('TODO')}
              >
                FILTER
              </Button>
              <Toggle
                labels={['List', 'Grid']}
                isChecked={mode === VIEW_MODE.GRID}
                icon={{
                  src: mode === VIEW_MODE.LIST ? '/icons/list.svg' : '/icons/grid.svg',
                  alt: mode === VIEW_MODE.LIST ? 'List icon' : 'Grid icon'
                }}
                onChangeCallback={(): void => setMode(mode === VIEW_MODE.LIST ? VIEW_MODE.GRID : VIEW_MODE.LIST)}
              />
            </div>
            <div className={articlesClassName}>
              {articles?.map((article: IArticle, index: number) => (
                <Card
                  key={index}
                  article={article}
                  mode={mode}
                />
              ))}
            </div>
          </div>
        )}
      </main>
  );
}
