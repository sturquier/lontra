import './checkbox.scss';

interface ICheckboxProps {
  isChecked: boolean;
  onChangeCallback: () => void;
}

export default function Checkbox ({ isChecked, onChangeCallback }: ICheckboxProps) {
  return (
    <input
      type='checkbox'
      checked={isChecked}
      onChange={onChangeCallback}
    />
  )
}