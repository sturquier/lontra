'use client';

import { useState, useEffect } from 'react';

import { IWebsite } from '@models/website';
import { useFetchWebsitesQuery } from '@store/features/websites/websites.query';
import { crawlersPath, CRAWLING_STATUS } from '@utils/crawler';
import { Button, Checkbox, Loader } from '@components/index';
import './page.scss';

export default function Settings() {
  const { data: fetchedWebsites, isFetching } = useFetchWebsitesQuery();

  const [crawlableWebsites, setCrawlableWebsites] = useState<{ isChecked: boolean, crawlingStatus: CRAWLING_STATUS, website: IWebsite }[]>([]);

  useEffect(() => {
    if (fetchedWebsites?.length && !crawlableWebsites.length) {
      setCrawlableWebsites(fetchedWebsites.map((fetchedWebsite) => ({
        isChecked: false,
        crawlingStatus: CRAWLING_STATUS.NOT_CRAWLED,
        website: fetchedWebsite
      })));
    }
  }, [fetchedWebsites, crawlableWebsites])

  const isFormDisabled = (): boolean => !crawlableWebsites.some(crawlableWebsite => crawlableWebsite.isChecked)

  const onCheckWebsite = (websiteId: string): void => {
    setCrawlableWebsites(crawlableWebsites.map((crawlableWebsite) => {
      if (crawlableWebsite.website.id === websiteId) {
        return {
          ...crawlableWebsite,
          isChecked: !crawlableWebsite.isChecked
        }
      }

      return crawlableWebsite;
    }));
  }

  const crawlWebsites = async (): Promise<void> => {
    const checkedWebsites = crawlableWebsites.filter((crawlableWebsite) => crawlableWebsite.isChecked)

    await Promise.all(checkedWebsites.map(async (checkedWebsite) => {
      const crawledWebsite = await (await fetch(`${crawlersPath}/${checkedWebsite.website.slug}`)).json()
      console.log('PWET', crawledWebsite)
    }));
  }

  return (
    <main className='settings'>
      <h1>SETTINGS</h1>
      {isFetching ? (
        <Loader />
      ) : (
        <div className='settings-form'>
          <div className='settings-form-websites'>
            {crawlableWebsites?.map((crawlableWebsite, index: number) => (
              <div key={index} className='settings-form-websites-website'>
                <span>{crawlableWebsite.website.name}</span>
                <Checkbox
                  onChangeCallback={(): void => onCheckWebsite(crawlableWebsite.website.id)}
                />
                <span>{crawlableWebsite.crawlingStatus}</span>
              </div>
            ))}
          </div>
          <Button
            children='CRAWL'
            disabled={isFormDisabled()}
            onClickCallback={(): Promise<void> => crawlWebsites()}
          />
        </div>
      )}
    </main>
  )
}