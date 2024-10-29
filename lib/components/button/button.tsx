import { PropsWithChildren } from 'react';
import Image from 'next/image';

import './button.scss';

interface IButtonProps extends PropsWithChildren {
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: {
    src: string;
    alt: string;
  }
  className?: string;
  onClickCallback?: () => void;
}

export default function Button ({ children, type, disabled, icon, className, onClickCallback }: IButtonProps) {
  return (
    <button
      type={type}
      className={`button ${className ? `button-${className}` : ''}`}
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