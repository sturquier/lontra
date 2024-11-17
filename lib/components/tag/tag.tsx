import { PropsWithChildren } from 'react';
import Image from 'next/image';

import './tag.scss'

interface ITagProps extends PropsWithChildren {
  onDeleteCallback: () => void;
}

export default function Tag ({ children, onDeleteCallback }: ITagProps) {
  return (
    <div className='tag'>
      {children}
      <Image
        className='tag-icon'
        src="/icons/delete.svg"
        alt="Delete icon"
        width={18}
        height={18}
        onClick={onDeleteCallback}
      />
    </div>
  )
}