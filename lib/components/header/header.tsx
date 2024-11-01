'use client';

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { PATH } from '@config/router';
import './header.scss';

export default function Header () {
  const pathname = usePathname();

  const linkClassName = (selectedPath: string): string => `header-links-link ${pathname === selectedPath ? 'header-links-link-active' : ''}`

  return (
    <nav className="header">
      <Link href={PATH.HOME} className="header-logo">
        <Image
          src="/icons/logo.svg"
          alt='Logo'
          width={40}
          height={40}
        />
      </Link>
      <div className="header-links">
        <Link href={PATH.HOME} className={linkClassName(PATH.HOME)}>
          <Image
            src="/icons/article.svg"
            alt='Article icon'
            width={18}
            height={18}
          />
          HOME
        </Link>
        <Link href={PATH.SETTINGS} className={linkClassName(PATH.SETTINGS)}>
          <Image
            src="/icons/settings.svg"
            alt='Settings icon'
            width={18}
            height={18}
          />
          SETTINGS
        </Link>
      </div>
    </nav>
  )
}