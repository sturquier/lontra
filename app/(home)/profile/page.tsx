'use client';

import { useFetchProfileQuery } from '@store/features/profile/profile.query';
import { Loader } from '@components/index';
import './page.scss';

export default function Profile() {
  const { data: profile, isFetching } = useFetchProfileQuery();

  return (
    <main className='profile'>
      <h1>Profile</h1>
      {isFetching ? (
        <Loader fullPage />
      ) : (
        <div className='profile-content'>
          <div className='profile-content-row'>Email : {profile?.email}</div>
        </div>
      )}
    </main>
  )
}