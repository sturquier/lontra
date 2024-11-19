import { PropsWithChildren } from 'react';

import styles from './checkbox.module.scss';

interface ICheckboxProps extends PropsWithChildren {
  id: string;
  isChecked: boolean;
  onChangeCallback: () => void;
}

export default function Checkbox ({ children, id, isChecked, onChangeCallback }: ICheckboxProps) {
  return (
    <div className={styles.checkbox}>
      <input
        className={styles['checkbox-input']}
        type='checkbox'
        id={`checkbox-${id}`}
        checked={isChecked}
        onChange={onChangeCallback}
      />
      <label htmlFor={`checkbox-${id}`} className={styles['checkbox-label']}>{children}</label>
    </div>
  )
}