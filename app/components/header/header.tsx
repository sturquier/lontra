import Link from 'next/link'

import './header.scss';

export default function Header () {
  return (
    <nav className="header">
      <Link href="/">LONTRA</Link>
      <div className="header-flags">
        <span>FR</span>
        <span>EN</span>
      </div>
    </nav>
  )
}