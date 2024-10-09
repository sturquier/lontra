'use client';

import { useState, useEffect } from 'react';

import { IWebsite } from '@models/website';
import { useFetchWebsitesQuery } from '@store/features/websites/websites.query';
import { CRAWLING_STATUS, crawlersFactory } from '@utils/crawler';
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

  const crawlWebsites = (): void => {
    const checkedWebsites = crawlableWebsites.filter((crawlableWebsite) => crawlableWebsite.isChecked)

    checkedWebsites.forEach((checkedWebsite) => {
      crawlersFactory(checkedWebsite.website.id)
    });
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
            text='CRAWL'
            disabled={isFormDisabled()}
          />
        </div>
      )}
    </main>
  )
}