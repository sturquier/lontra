import { ChangeEvent } from 'react';
import Image from 'next/image';

import './input.scss';

interface IInputProps {
  placeholder: string;
  value: string;
  onChangeCallback: (value: string) => void;
  onClearCallback: () => void;
}

export default function Input ({ placeholder, value, onChangeCallback, onClearCallback }: IInputProps) {
  return (
    <div className='inputSearch'>
      <Image
        className='inputSearch-icon inputSearch-icon-search'
        src={'/icons/search.svg'}
        alt={'Search icon'}
        width={20}
        height={20}
      />
      <input
        className="inputSearch-input"
        placeholder={placeholder}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => onChangeCallback(event.target.value)}
      />
      {value && (
        <Image
          className='inputSearch-icon inputSearch-icon-clear'
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