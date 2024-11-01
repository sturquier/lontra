'use client';

import { useFetchCategoriesQuery } from '@store/features/categories/categories.query';
import { useFetchProfileQuery } from '@store/features/profile/profile.query';
import { Loader, Tabs } from '@components/index';
import { ProfileCategoriesTab, ProfileFavoritesTab, ProfileInformationsTab } from './tabs';

export default function Profile() {
  const { data: profile, isFetching: isFetchingProfile } = useFetchProfileQuery();
  const { data: categories, isFetching: isFetchingCategories } = useFetchCategoriesQuery();

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
      content: <ProfileCategoriesTab categories={categories ?? []} />
    }
  ];

  return (
    <main className='profile'>
      <h1>Profile</h1>
      {(isFetchingProfile || isFetchingCategories) ? (
        <Loader fullPage />
      ) : (
        <Tabs tabs={getTabs()} />
      )}
    </main>
  )
}