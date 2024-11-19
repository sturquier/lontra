'use client';

import { useState, useEffect, MouseEvent, MutableRefObject } from 'react';
import Image from 'next/image';

import { ITag } from '@models/tag';
import { IWebsite } from '@models/website';
import { IFilters } from '@utils/filter';
import { Button, Datepicker, Dropdown } from '@components/index';
import styles from './modal.module.scss';


interface IModalProps {
  dialogRef: MutableRefObject<HTMLDialogElement | null>;
  filters: IFilters;
  websites: IWebsite[];
  tags: ITag[];
  onApplyFiltersCallback: (filters: IFilters) => void;
  onCloseCallback: () => void;
}

export default function Modal ({ dialogRef, filters, websites, tags, onApplyFiltersCallback, onCloseCallback }: IModalProps) {
  const [modalFilters, setModalFilters] = useState<IFilters>(filters);

  useEffect(() => {
    setModalFilters(filters);
  }, [filters]);

  const updateFilter = (key: keyof IFilters, value: string[] | Date | null | boolean): void => {
    setModalFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  }

  const cancelFilters = (): void => {
    setModalFilters(filters);
    onCloseCallback();
  }

  const applyFilters = (): void => {
    onApplyFiltersCallback(modalFilters);
    onCloseCallback();
  }

  return (
    <dialog className={styles.modal} ref={dialogRef} onClick={onCloseCallback}>
      <div className={styles['modal-content']} onClick={(event: MouseEvent<HTMLDivElement>): void => event.stopPropagation()}>
        <h3 className={styles['modal-content-title']}>Filter articles</h3>
        <div className={styles['modal-content-filters']}>
          <div className={styles['modal-content-filters-filter']}>
            <label>By websites :</label>
            <Dropdown
              placeholder="Select websites"
              options={websites.map(website => ({ value: website.id, label: website.name }))}
              selectedOptions={modalFilters.websiteIds}
              onChangeCallback={(websiteIds: string[]): void => updateFilter('websiteIds', websiteIds)}
            />
          </div>
          <div className={styles['modal-content-filters-filter']}>
            <label>By date :</label>
            <Datepicker
              startDate={modalFilters.date}
              onChangeCallback={(date: Date | null): void => updateFilter('date', date)}
            />
          </div>
          <div className={styles['modal-content-filters-filter']}>
            <label>By favorite :</label>
            <div className={styles['modal-content-filters-filter-favorite']} onClick={(): void => updateFilter('favorite', !modalFilters.favorite)}>
              <Image
                src={modalFilters.favorite ? '/icons/heart-fill.svg' : '/icons/heart.svg'}
                alt='Heart icon'
                width={20}
                height={20}
              />
              <span>{modalFilters.favorite ? 'Favorite articles' : 'All articles'}</span>
            </div>
          </div>
          <div className={styles['modal-content-filters-filter']}>
            <label>By tags :</label>
            <Dropdown
              placeholder="Select tags"
              options={tags.map(tag => ({ value: tag.id, label: tag.label }))}
              selectedOptions={modalFilters.tagIds}
              onChangeCallback={(tagIds: string[]): void => updateFilter('tagIds', tagIds)}
            />
          </div>
        </div>
        <div className={styles['modal-content-footer']}>
          <Button onClickCallback={cancelFilters} className='secondary'>CANCEL</Button>
          <Button onClickCallback={applyFilters}>APPLY FILTERS</Button>
        </div>
      </div>
    </dialog>
  )
}