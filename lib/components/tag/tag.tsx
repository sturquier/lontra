import { PropsWithChildren } from 'react';
import Image from 'next/image';

import styles from './tag.module.scss'

interface ITagProps extends PropsWithChildren {
  onDeleteCallback: () => void;
}

export default function Tag ({ children, onDeleteCallback }: ITagProps) {
  return (
    <div className={styles.tag}>
      {children}
      <Image
        className={styles['tag-icon']}
        src="/icons/delete.svg"
        alt="Delete icon"
        width={18}
        height={18}
        onClick={onDeleteCallback}
      />
    </div>
  )
}