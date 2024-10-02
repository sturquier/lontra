'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Card, Sidebar } from '@components/index';
import { IArticle } from '@models/article';
import { VIEW_MODE } from '@utils/card';
import './page.scss';

export default function Home() {
  const [mode, setMode] = useState<VIEW_MODE>(VIEW_MODE.LIST);

  const articles: IArticle[] = [
    { id: 1, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 2, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 3, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 4, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 5, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 6, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 7, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 8, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 9, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 10, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' }
  ];

  const articlesClassName: string = `home-content-articles ${mode === VIEW_MODE.LIST ? 'home-content-articles-list' : 'home-content-articles-grid'}`

  const switchRowClassName = (selectedMode: VIEW_MODE): string => `${mode === selectedMode ? 'home-title-switch-row home-title-switch-row-selected' : 'home-title-switch-row'}`

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
        <div className='home-content'>
          <Sidebar />
          <div className={articlesClassName}>
            {articles.map((article: IArticle, index: number) => (
              <Card key={index} article={article} />
            ))}
          </div>
        </div>
      </main>
  );
}
