import { ChangeEvent } from 'react';
import Image from 'next/image';

import './searchInput.scss';

interface ISearchInputProps {
  placeholder: string;
  value: string;
  onChangeCallback: (value: string) => void;
  onClearCallback: () => void;
}

export default function SearchInput ({ placeholder, value, onChangeCallback, onClearCallback }: ISearchInputProps) {
  return (
    <div className='searchInput'>
      <Image
        className='searchInput-icon searchInput-icon-search'
        src={'/icons/search.svg'}
        alt={'Search icon'}
        width={20}
        height={20}
      />
      <input
        className="searchInput-input"
        placeholder={placeholder}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => onChangeCallback(event.target.value)}
      />
      {value && (
        <Image
          className='searchInput-icon searchInput-icon-clear'
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