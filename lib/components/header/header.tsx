import Link from 'next/link'
import Image from 'next/image'

import './header.scss';

export default function Header () {
  return (
    <nav className="header">
      <Link href="/">
        <Image
          src="/favicon.ico"
          alt='Logo'
          width={40}
          height={40}
        />
      </Link>
      <div className="header-flags">
        <span>FR</span>
        <span>EN</span>
      </div>
    </nav>
  )
}