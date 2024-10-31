'use client';

import { useFetchProfileQuery } from '@store/features/profile/profile.query';
import { Loader, Tabs } from '@components/index';
import './page.scss';

export default function Profile() {
  const { data: profile, isFetching } = useFetchProfileQuery();

  const getTabs = (): {
    title: string;
    content: JSX.Element;
  }[] => [
    { title: 'Informations', content: renderInformationsTab() },
    { title: 'Favorites', content: renderFavoritesTab() },
    { title: 'Categories', content: renderCategoriesTab() }
  ];

  const renderInformationsTab = (): JSX.Element => {
    return (
      <div className='profile-informations'>
        <h2 className='profile-informations-title'>Informations</h2>
        <div className='profile-informations-rows'>
          <div className='profile-informations-rows-row'>Email : {profile?.email}</div>
        </div>
      </div>
    )
  }

  const renderFavoritesTab = (): JSX.Element => {
    return (
      <div className='profile-favorites'>
        <h2 className='profile-favorites-title'>Favorites</h2>
      </div>
    )
  }

  const renderCategoriesTab = (): JSX.Element => {
    return (
      <div className='profile-categories'>
        <h2 className='profile-categories-title'>Categories</h2>
      </div>
    )
  }

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