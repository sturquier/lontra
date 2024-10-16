import { PropsWithChildren } from 'react';
import Image from 'next/image';

import './button.scss';

interface IButtonProps extends PropsWithChildren {
  disabled?: boolean;
  icon?: {
    src: string;
    alt: string;
  }
  onClickCallback: () => void;
}

export default function Button ({ children, disabled, icon, onClickCallback }: IButtonProps) {
  return (
    <button
      className='button'
      disabled={disabled}
      onClick={onClickCallback}
    >
      {icon && (
        <Image
          src={icon.src}
          alt={icon.alt}
          width={14}
          height={14}
        />
      )}
      {children}
    </button>
  )
}