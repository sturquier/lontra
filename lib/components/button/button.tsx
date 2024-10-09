import './button.scss';

interface IButtonProps {
  text: string;
  disabled: boolean;
}

export default function Button ({ text, disabled }: IButtonProps) {
  return (
    <button disabled={disabled}>{text}</button>
  )
}