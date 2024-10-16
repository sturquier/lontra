import Image from 'next/image';

import './toggle.scss';

interface IToggleProps {
  labels: string[];
  isChecked: boolean;
  icon: {
    src: string;
    alt: string;
  }
  onChangeCallback: () => void;
}

export default function Toggle({ labels, isChecked, icon, onChangeCallback }: IToggleProps) {
  return (
    <div className='toggle'>
      <label>{labels[0]}</label>
      <div className='toggle-wrapper'>
        <input
          className='toggle-wrapper-input'
          type='checkbox'
          checked={isChecked}
          onChange={onChangeCallback}
        />
        <div className='toggle-wrapper-slider'>
          <div className='toggle-wrapper-slider-icon'>
            <Image
              src={icon.src}
              alt={icon.alt}
              width={14}
              height={14}
            />
          </div>
        </div>
      </div>
      <label>{labels[1]}</label>
    </div>
  );
}
