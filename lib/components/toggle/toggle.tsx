import Image from 'next/image';

import styles from './toggle.module.scss';

interface IToggleProps {
  labels: string[];
  isChecked: boolean;
  icon: {
    src: string;
    alt: string;
  }
  onChangeCallback: () => void;
}

export default function Toggle({ labels, isChecked, icon, onChangeCallback }: IToggleProps) {
  return (
    <div className={styles.toggle}>
      <label>{labels[0]}</label>
      <div className={styles['toggle-wrapper']}>
        <input
          className={styles['toggle-wrapper-input']}
          type='checkbox'
          checked={isChecked}
          onChange={onChangeCallback}
        />
        <div className={styles['toggle-wrapper-slider']}>
          <div className={styles['toggle-wrapper-slider-icon']}>
            <Image
              src={icon.src}
              alt={icon.alt}
              width={14}
              height={14}
            />
          </div>
        </div>
      </div>
      <label>{labels[1]}</label>
    </div>
  );
}
