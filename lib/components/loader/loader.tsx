import { ClipLoader, PulseLoader } from 'react-spinners';

import './loader.scss';

interface ILoaderProps {
  fullPage?: boolean;
}

export default function Loader ({ fullPage }: ILoaderProps) {
  if (fullPage) {
    return (
      <PulseLoader
        color="var(--moderate-blue)"
        className='loader loader-global'
      />
    )
  }

  return (
    <ClipLoader
        color="var(--moderate-blue)"
        className='loader'
        size={18}
    />
  )
}