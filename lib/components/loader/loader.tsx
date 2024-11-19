import { ClipLoader, PulseLoader } from 'react-spinners';

import styles from './loader.module.scss';

interface ILoaderProps {
  fullPage?: boolean;
}

export default function Loader ({ fullPage }: ILoaderProps) {
  if (fullPage) {
    return (
      <PulseLoader
        color="var(--moderate-blue)"
        className={`${styles.loader} ${styles['loader-global']}`}
      />
    )
  }

  return (
    <ClipLoader
        color="var(--moderate-blue)"
        className={styles.loader}
        size={18}
    />
  )
}