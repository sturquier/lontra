import { useState } from 'react';

import useDialog from '@hooks/dialog';
import { IArticle } from '@models/article';
import { useFetchArticlesQuery } from '@store/features/articles/articles.query';
import { useFetchTagsQuery } from '@store/features/tags/tags.query';
import { linkTags, toggleFavorite, unlinkTag, VIEW_MODE } from '@utils/card';
import { defaultFilters } from '@utils/filter';
import { Card, Loader, Swiper, TagsModal } from '@components/index';
import styles from './favorites.module.scss';

export default function ProfileFavoritesTab () {
  const [tagsLinkedArticle, setTagsLinkedArticle] = useState<IArticle | null>(null);

  const { CreateDialogRef, openDialog, closeDialog } = useDialog();

  const { data, isFetching: isFetchingArticles, refetch: refetchArticles } = useFetchArticlesQuery({ page: 1, itemsPerPage: -1, filters: { ...defaultFilters, favorite: true } });
  const { data: tags, isFetching: isFetchingTags } = useFetchTagsQuery();

  const tagsDialogRef = CreateDialogRef();

  const openTagsDialog = (linkedArticle: IArticle): void => {
    openDialog(tagsDialogRef);
    setTagsLinkedArticle(linkedArticle);
  }

  const closeTagsDialog = (): void => {
    closeDialog(tagsDialogRef);
    setTagsLinkedArticle(null);
  }

  const linkArticleTags = async (tagIds: string[]): Promise<void> => {
    await linkTags(tagsLinkedArticle!.id, tagIds, refetchArticles);
    closeTagsDialog();
  }

  return (isFetchingArticles || isFetchingTags) ? (
    <Loader fullPage />
  ) : (
    <div className={styles['profile-favorites']}>
      <h2 className={styles['profile-favorites-title']}>Favorites</h2>
      <TagsModal
        dialogRef={tagsDialogRef}
        article={tagsLinkedArticle}
        tags={tags ?? []}
        articleTags={tagsLinkedArticle?.tags.map(tag => tag.id) ?? []}
        onLinkTagsCallback={(linkedTags: string[]): Promise<void> => linkArticleTags(linkedTags)}
        onCloseCallback={closeTagsDialog}
      />
      <Swiper
        slides={
          (data?.articles ?? []).map((article) => (
            <Card
              key={article.id}
              mode={VIEW_MODE.LIST}
              article={article}
              toggleFavoriteCallback={(): Promise<void> => toggleFavorite(article.id, refetchArticles)}
              unlinkTagCallback={(tagId: string): Promise<void> => unlinkTag(article.id, tagId, refetchArticles)}
              openTagsLinkDialogCallback={(): void => openTagsDialog(article)}
            />
          ))
        }
      />
    </div>
  )
}