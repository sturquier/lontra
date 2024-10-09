import './checkbox.scss';

interface ICheckboxProps {
  onChangeCallback: () => void;
}

export default function Checkbox ({ onChangeCallback }: ICheckboxProps) {
  return (
    <input
      type='checkbox'
      onChange={onChangeCallback}
    />
  )
}