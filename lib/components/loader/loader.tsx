import { MoonLoader } from 'react-spinners';

import './loader.scss';

export default function Loader () {
  return (
    <MoonLoader
      color="var(--blue)"
      className='loader'
    />
  )
}