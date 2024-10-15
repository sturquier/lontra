import { PropsWithChildren } from 'react';

import './checkbox.scss';

interface ICheckboxProps extends PropsWithChildren {
  id: string;
  isChecked: boolean;
  onChangeCallback: () => void;
}

export default function Checkbox ({ children, id, isChecked, onChangeCallback }: ICheckboxProps) {
  return (
    <div className='checkbox'>
      <input
        className='checkbox-input'
        type='checkbox'
        id={`checkbox-${id}`}
        checked={isChecked}
        onChange={onChangeCallback}
      />
      <label htmlFor={`checkbox-${id}`} className='checkbox-label'>{children}</label>
    </div>
  )
}