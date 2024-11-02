import { useFetchProfileQuery } from '@store/features/profile/profile.query';
import { Loader } from '@components/index';
import './informations.scss';

export default function ProfileInformationsTab () {
  const { data: profile, isFetching } = useFetchProfileQuery();

  return isFetching ? (
    <Loader fullPage />
  ) : (
    <div className='profile-informations'>
      <h2 className='profile-informations-title'>Informations</h2>
      <div>Email : {profile?.email}</div>
    </div>
  )
}