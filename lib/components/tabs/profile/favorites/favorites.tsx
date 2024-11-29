import { useFetchArticlesQuery } from '@store/features/articles/articles.query';
import { toggleFavorite, unlinkTag, VIEW_MODE } from '@utils/card';
import { Card, Loader, Swiper } from '@components/index';
import './favorites.scss';

export default function ProfileFavoritesTab () {
  const { data, isFetching, refetch } = useFetchArticlesQuery({ page: 1, itemsPerPage: -1, filters: { favorite: true, date: null, websiteIds: [], tagIds: [] } });

  return isFetching ? (
    <Loader fullPage />
  ) : (
    <div className='profile-favorites'>
      <h2 className='profile-favorites-title'>Favorites</h2>
      <Swiper
        slides={
          (data?.articles ?? []).map((article, index) => (
            <Card
              key={index}
              mode={VIEW_MODE.LIST}
              article={article}
              toggleFavoriteCallback={(): Promise<void> => toggleFavorite(article.id, refetch())}
              unlinkTagCallback={(tagId: string): Promise<void> => unlinkTag(article.id, tagId, refetch())}
            />
          ))
        }
      />
    </div>
  )
}