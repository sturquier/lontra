'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { useFetchWebsitesQuery } from '@store/features/websites/websites.query';
import { crawlersPath, articlesBulkInsertionPath, CRAWLING_STATUS } from '@utils/crawler';
import { Button, Checkbox, Loader } from '@components/index';
import './page.scss';

interface ICrawlableWebsite {
  isChecked: boolean;
  crawlingStatus: CRAWLING_STATUS;
  website: IWebsite;
}

export default function Settings() {
  const { data: fetchedWebsites, isFetching } = useFetchWebsitesQuery();

  const [crawlableWebsites, setCrawlableWebsites] = useState<ICrawlableWebsite[]>([]);

  useEffect(() => {
    if (fetchedWebsites?.length && !crawlableWebsites.length) {
      setCrawlableWebsites(fetchedWebsites.map((fetchedWebsite) => ({
        isChecked: false,
        crawlingStatus: CRAWLING_STATUS.NOT_CRAWLED,
        website: fetchedWebsite
      })));
    }
  }, [fetchedWebsites, crawlableWebsites])

  const isFormDisabled: boolean = !crawlableWebsites.some((crawlableWebsite) => crawlableWebsite.isChecked)

  const checkedWebsites: ICrawlableWebsite[] = crawlableWebsites.filter((crawlableWebsite) => crawlableWebsite.isChecked);

  const areAllWebsitesChecked: boolean = checkedWebsites.length === crawlableWebsites.length

  const onCheckWebsite = (websiteId: string): void => {
    setCrawlableWebsites(crawlableWebsites.map((crawlableWebsite) =>
      crawlableWebsite.website.id === websiteId
        ? { ...crawlableWebsite, isChecked: !crawlableWebsite.isChecked }
        : crawlableWebsite
    ));
  }

  const onToggleAllWebsites = (areChecked: boolean): void => setCrawlableWebsites(crawlableWebsites.map((crawlableWebsite) => ({ ...crawlableWebsite, isChecked: areChecked })))

  const crawlWebsites = async (): Promise<void> => {
    setCrawlableWebsites((prevWebsites) => 
      prevWebsites.map((prevWebsite) => 
        checkedWebsites.some((checkedWebsite) => checkedWebsite.website.id === prevWebsite.website.id)
          ? { ...prevWebsite, crawlingStatus: CRAWLING_STATUS.CRAWLING }
          : prevWebsite
      )
    );

    await Promise.all(checkedWebsites.map(async (checkedWebsite) => {
      const { website } = checkedWebsite;

      const crawledWebsite: { message?: string; error?: string; articles?: CreateArticlePayload[] } = await (
        await fetch(crawlersPath, {
          method: 'POST',
          body: JSON.stringify({ website })
        })
      ).json()

      if (crawledWebsite.message && crawledWebsite.articles) {
        await fetch(articlesBulkInsertionPath, {
          method: 'POST',
          body: JSON.stringify({ articles: crawledWebsite.articles, website })
        })
      }
      
      setCrawlableWebsites((prevWebsites) =>
        prevWebsites.map((prevWebsite) =>
          prevWebsite.website.id === checkedWebsite.website.id
            ? { ...prevWebsite, crawlingStatus: crawledWebsite.error ? CRAWLING_STATUS.FAILURE : CRAWLING_STATUS.SUCCESS }
            : prevWebsite
        )
      );
    }));
  }

  const renderCrawlableWebsiteStatus = (crawlingStatus: CRAWLING_STATUS): JSX.Element | null => {
    if (crawlingStatus === CRAWLING_STATUS.NOT_CRAWLED) return null;

    if (crawlingStatus === CRAWLING_STATUS.CRAWLING) return <Loader />;

    return (
      <Image
        src={crawlingStatus === CRAWLING_STATUS.SUCCESS ? "/icons/success.svg" : "/icons/error.svg"}
        alt={crawlingStatus === CRAWLING_STATUS.SUCCESS ? "Success icon" : "Error icon"}
        width={20}
        height={20}
      />
    )
  }

  return (
    <main className='settings'>
      <h1>Settings</h1>
      {isFetching ? (
        <Loader fullPage />
      ) : (
        <div className='settings-content'>
          <div className='settings-content-all'>
            <Checkbox
              id='all'
              isChecked={areAllWebsitesChecked}
              onChangeCallback={(): void => areAllWebsitesChecked ? onToggleAllWebsites(false) : onToggleAllWebsites(true)}
            >
              {areAllWebsitesChecked ? 'Uncheck all' : 'Check all'}
            </Checkbox>
          </div>
          <div className='settings-content-websites'>
            {crawlableWebsites?.map((crawlableWebsite, index: number) => (
              <div key={index} className='settings-content-websites-website'>
                <Checkbox
                  id={crawlableWebsite.website.id}
                  isChecked={crawlableWebsite.isChecked}
                  onChangeCallback={(): void => onCheckWebsite(crawlableWebsite.website.id)}
                >
                  {crawlableWebsite.website.name}
                </Checkbox>
                <span>{renderCrawlableWebsiteStatus(crawlableWebsite.crawlingStatus)}</span>
              </div>
            ))}
          </div>
          <div className='settings-content-submit'>
            <Button
              disabled={isFormDisabled}
              onClickCallback={crawlWebsites}
            >
              CRAWL WEBSITES
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}