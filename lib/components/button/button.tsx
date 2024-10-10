import { PropsWithChildren } from 'react';

import './button.scss';

interface IButtonProps extends PropsWithChildren {
  disabled: boolean;
  onClickCallback: () => void;
}

export default function Button ({ children, disabled, onClickCallback }: IButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClickCallback}
    >{children}</button>
  )
}