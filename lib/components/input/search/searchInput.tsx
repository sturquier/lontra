import { ChangeEvent } from 'react';
import Image from 'next/image';

import styles from './searchInput.module.scss';

interface ISearchInputProps {
  placeholder: string;
  value: string;
  onChangeCallback: (value: string) => void;
  onClearCallback: () => void;
}

export default function SearchInput ({ placeholder, value, onChangeCallback, onClearCallback }: ISearchInputProps) {
  return (
    <div className={styles.searchInput}>
      <Image
        className={`${styles['searchInput-icon']} ${styles['searchInput-icon-search']}`}
        src={'/icons/search.svg'}
        alt={'Search icon'}
        width={20}
        height={20}
      />
      <input
        className={styles['searchInput-input']}
        placeholder={placeholder}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => onChangeCallback(event.target.value)}
      />
      {value && (
        <Image
          className={`${styles['searchInput-icon']} ${styles['searchInput-icon-clear']}`}
          src={'/icons/clear.svg'}
          alt={'Clear icon'}
          width={20}
          height={20}
          onClick={onClearCallback}
        />
      )}
    </div>
  )
}