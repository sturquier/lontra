import { useFetchProfileQuery } from '@store/features/profile/profile.query';
import { Loader } from '@components/index';
import styles from './informations.module.scss';

export default function ProfileInformationsTab () {
  const { data: profile, isFetching } = useFetchProfileQuery();

  return isFetching ? (
    <Loader fullPage />
  ) : (
    <div className={styles['profile-informations']}>
      <h2 className={styles['profile-informations-title']}>Informations</h2>
      <div>Email : {profile?.email}</div>
    </div>
  )
}