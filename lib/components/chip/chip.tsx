import { PropsWithChildren } from 'react';
import Image from 'next/image';

import styles from './chip.module.scss'

interface IChipProps extends PropsWithChildren {
  onDeleteCallback: () => void;
}

export default function Chip ({ children, onDeleteCallback }: IChipProps) {
  return (
    <div className={styles.chip}>
      {children}
      <Image
        className={styles['chip-icon']}
        src="/icons/delete.svg"
        alt="Delete icon"
        width={18}
        height={18}
        onClick={onDeleteCallback}
      />
    </div>
  )
}