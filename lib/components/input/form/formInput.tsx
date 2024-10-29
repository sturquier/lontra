import Image from 'next/image';
import { UseFormRegisterReturn } from 'react-hook-form';

import './formInput.scss';

interface IFormInputProps {
  placeholder: string;
  icon: {
    src: string;
    alt: string;
  }
  type?: string;
  register: UseFormRegisterReturn;
}

export default function Input ({ placeholder, icon, type, register }: IFormInputProps) {
  return (
    <div className='formInput'>
      <Image
        className='formInput-icon'
        src={icon.src}
        alt={icon.alt}
        width={20}
        height={20}
      />
      <input
        className="formInput-input"
        type={type}
        placeholder={placeholder}
        {...register}
      />
    </div>
  )
}