'use client';

import { Tabs } from '@components/index';
import { ProfileTagsTab, ProfileFavoritesTab, ProfileInformationsTab } from '@components/tabs/profile/index';

export default function Profile() {
  const getTabs = (): {
    title: string;
    icon: {
      src: string;
      alt: string;
    };
    content: JSX.Element;
  }[] => [
    {
      title: 'Informations',
      icon: {
        src: '/icons/user.svg',
        alt: 'User icon'
      },
      content: <ProfileInformationsTab /> 
    },
    {
      title: 'Favorites',
      icon: {
        src: '/icons/heart.svg',
        alt: 'Heart icon'
      },
      content: <ProfileFavoritesTab />
    },
    {
      title: 'Tags',
      icon: {
        src: '/icons/tag.svg',
        alt: 'Tag icon'
      },
      content: <ProfileTagsTab />
    }
  ];

  return (
    <main className='profile'>
      <h1>Profile</h1>
      <Tabs tabs={getTabs()} />
    </main>
  )
}