import { ClipLoader, PulseLoader } from 'react-spinners';

import './loader.scss';

interface ILoaderProps {
  isGlobal?: boolean;
}

export default function Loader ({ isGlobal }: ILoaderProps) {
  if (isGlobal) {
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