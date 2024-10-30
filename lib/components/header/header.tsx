'use client';

import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react';

import { PATH } from '@config/router';
import './header.scss';

export default function Header () {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const pathname = usePathname();

  const linkClassName = (selectedPath: string): string => `header-menu-links-link ${pathname === selectedPath ? 'header-menu-links-link-active' : ''}`

  const logout = async (): Promise<void> => await signOut();

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
      <div className='header-menu'>
        <div className="header-menu-links">
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
        <div
          className='header-menu-profile'
          onMouseEnter={() => setIsDropdownOpened(true)}
          onMouseLeave={() => setIsDropdownOpened(false)}
        >
          <Image
            src="/icons/profile.svg"
            alt='Profile icon'
            width={40}
            height={40}
          />
          <Image
            src={isDropdownOpened ? '/icons/caret-up.svg' : '/icons/caret-down.svg'}
            alt={isDropdownOpened ? 'Caret up icon' : 'Caret down icon'}
            width={24}
            height={24}
          />
          <div className={`header-menu-profile-dropdown ${isDropdownOpened ? 'header-menu-profile-dropdown-opened' : ''}`}>
            <div className='header-menu-profile-dropdown-section header-menu-profile-dropdown-section-bordered'>
              <Image
                src="/icons/user.svg"
                alt='User icon'
                width={20}
                height={20}
              />
              <Link
                href={PATH.PROFILE}
                className='header-menu-profile-dropdown-section-link'
                onClick={(): void => setIsDropdownOpened(false)}
              >
                PROFILE
              </Link>
            </div>
            <div className='header-menu-profile-dropdown-section'>
              <Image
                src="/icons/logout.svg"
                alt='Logout icon'
                width={20}
                height={20}
              />
              <span onClick={logout} className='header-menu-profile-dropdown-section-link'>LOGOUT</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}