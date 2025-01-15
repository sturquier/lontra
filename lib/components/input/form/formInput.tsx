import { HTMLInputTypeAttribute } from 'react';
import Image from 'next/image';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './formInput.module.scss';

interface IFormInputProps {
  placeholder: string;
  icon: {
    src: string;
    alt: string;
  }
  type?: HTMLInputTypeAttribute;
  isPassword?: boolean;
  togglePasswordTypeCallback?: () => void;
  register: UseFormRegisterReturn;
}

export default function FormInput ({ placeholder, icon, type, isPassword, togglePasswordTypeCallback, register }: IFormInputProps) {
  return (
    <div className={styles.formInput}>
      <Image
        className={`${styles['formInput-icon']} ${styles['formInput-icon-left']}`}
        src={icon.src}
        alt={icon.alt}
        width={20}
        height={20}
      />
      <input
        className={styles['formInput-input']}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {isPassword && (
        <Image
          className={`${styles['formInput-icon']} ${styles['formInput-icon-right']}`}
          src={type === 'password' ? '/icons/eye-off.svg' : '/icons/eye.svg'}
          alt={type === 'password' ? 'Eye off icon' : 'Eye icon'}
          width={20}
          height={20}
          onClick={togglePasswordTypeCallback}
        />
      )}
    </div>
  )
}