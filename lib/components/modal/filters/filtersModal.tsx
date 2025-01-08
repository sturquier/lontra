'use client';

import { useState, useEffect, MouseEvent, MutableRefObject } from 'react';
import Image from 'next/image';

import { ITag } from '@models/tag';
import { IWebsite } from '@models/website';
import { DateFilter, FavoriteFilter, IFilters, TagFilter, WebsiteFilter } from '@utils/filter';
import { Button, Datepicker, Dropdown } from '@components/index';
import modalStyles from '@components/modal/modal.module.scss';
import styles from './filtersModal.module.scss';


interface IFiltersModalProps {
  dialogRef: MutableRefObject<HTMLDialogElement | null>;
  filters: IFilters;
  websites: IWebsite[];
  tags: ITag[];
  onResetFiltersCallback: () => void;
  onApplyFiltersCallback: (filters: IFilters) => void;
  onCloseCallback: () => void;
}

export default function FiltersModal ({ dialogRef, filters, websites, tags, onResetFiltersCallback, onApplyFiltersCallback, onCloseCallback }: IFiltersModalProps) {
  const [modalFilters, setModalFilters] = useState<IFilters>(filters);

  useEffect(() => {
    setModalFilters(filters);
  }, [filters]);

  const updateFilter = (key: keyof IFilters, value: WebsiteFilter[] | DateFilter | FavoriteFilter | TagFilter[]): void => {
    setModalFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  }

  const cancelFilters = (): void => {
    setModalFilters(filters);
    onCloseCallback();
  }

  const resetFilters = (): void => {
    setModalFilters(filters);
    onResetFiltersCallback();
    onCloseCallback();
  }

  const applyFilters = (): void => {
    onApplyFiltersCallback(modalFilters);
    onCloseCallback();
  }

  return (
    <dialog className={`${modalStyles.modal} ${styles.filtersModal}`} ref={dialogRef} onClick={cancelFilters}>
      <div className={`${modalStyles['modal-content']} ${styles['filtersModal-content']}`} onClick={(event: MouseEvent<HTMLDivElement>): void => event.stopPropagation()}>
        <div className={`${modalStyles['modal-content-title']} ${styles['filtersModal-content-title']}`}>
          <h3>Filter articles</h3>
          <Image
            className={`${modalStyles['modal-content-title-icon']} ${styles['filtersModal-content-title-icon']}`}
            src={'/icons/clear.svg'}
            alt='Clear icon'
            width={25}
            height={25}
            onClick={cancelFilters}
          />
        </div>
        <div className={styles['filtersModal-content-filters']}>
          <div className={styles['filtersModal-content-filters-filter']}>
            <label>By websites :</label>
            <Dropdown
              placeholder="Select websites"
              options={websites.map(website => ({ value: website.id, label: website.name }))}
              selectedOptions={modalFilters.websites.map(website => website.id)}
              onChangeCallback={(options): void => updateFilter('websites', options.map(option => ({ id: option.value, name: option.label })) as WebsiteFilter[])}
            />
          </div>
          <div className={styles['filtersModal-content-filters-filter']}>
            <label>By date :</label>
            <Datepicker
              startDate={modalFilters.date}
              onChangeCallback={(date: Date | null): void => updateFilter('date', date as DateFilter)}
            />
          </div>
          <div className={styles['filtersModal-content-filters-filter']}>
            <label>By favorite :</label>
            <div className={styles['filtersModal-content-filters-filter-favorite']} onClick={(): void => updateFilter('favorite', !modalFilters.favorite as FavoriteFilter)}>
              <Image
                src={modalFilters.favorite ? '/icons/heart-fill.svg' : '/icons/heart.svg'}
                alt='Heart icon'
                width={20}
                height={20}
              />
              <span>{modalFilters.favorite ? 'Favorite articles' : 'All articles'}</span>
            </div>
          </div>
          <div className={styles['filtersModal-content-filters-filter']}>
            <label>By tags :</label>
            <Dropdown
              placeholder="Select tags"
              options={tags.map(tag => ({ value: tag.id, label: tag.label }))}
              selectedOptions={modalFilters.tags.map(tag => tag.id)}
              onChangeCallback={(options): void => updateFilter('tags', options.map(option => ({ id: option.value, label: option.label })) as TagFilter[])}
            />
          </div>
        </div>
        <div className={`${modalStyles['modal-content-footer']} ${styles['filtersModal-content-footer']}`}>
          <Button onClickCallback={resetFilters} className='secondary'>RESET FILTERS</Button>
          <Button onClickCallback={applyFilters}>APPLY FILTERS</Button>
        </div>
      </div>
    </dialog>
  )
}