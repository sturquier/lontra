import Image from 'next/image';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './formInput.module.scss';

interface IFormInputProps {
  placeholder: string;
  icon: {
    src: string;
    alt: string;
  }
  type?: string;
  register: UseFormRegisterReturn;
}

export default function FormInput ({ placeholder, icon, type, register }: IFormInputProps) {
  return (
    <div className={styles.formInput}>
      <Image
        className={styles['formInput-icon']}
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
    </div>
  )
}