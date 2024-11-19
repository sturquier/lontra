import styles from './favorites.module.scss';

export default function ProfileFavoritesTab () {
  return (
    <div className={styles['profile-favorite']}>
      <h2 className={styles['profile-favorite-title']}>Favorites</h2>
    </div>
  )
}