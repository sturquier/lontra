import { PacmanLoader } from 'react-spinners';

import './loader.scss';

export default function Loader () {
  return (
    <PacmanLoader
      color="var(--blue)"
      className='loader'
    />
  )
}