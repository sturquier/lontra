'use client';

import { useFetchProfileQuery } from '@store/features/profile/profile.query';
import { Loader, Tabs } from '@components/index';
import { ProfileCategoriesTab, ProfileFavoritesTab, ProfileInformationsTab } from './tabs';

export default function Profile() {
  const { data: profile, isFetching } = useFetchProfileQuery();

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
      content: <ProfileInformationsTab profile={profile} /> 
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
      title: 'Categories',
      icon: {
        src: '/icons/tag.svg',
        alt: 'Tag icon'
      },
      content: <ProfileCategoriesTab />
    }
  ];

  return (
    <main className='profile'>
      <h1>Profile</h1>
      {isFetching ? (
        <Loader fullPage />
      ) : (
        <Tabs tabs={getTabs()} />
      )}
    </main>
  )
}