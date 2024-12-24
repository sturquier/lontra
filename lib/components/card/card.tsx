import { IArticle } from '@models/article';
import { VIEW_MODE } from '@utils/card';
import GridCard from './grid/gridCard';
import ListCard from './list/listCard';

interface ICardProps {
  mode: VIEW_MODE;
  article: IArticle;
  toggleFavoriteCallback: () => void;
  unlinkTagCallback: (id: string) => void;
  openTagsLinkDialogCallback: () => void;
}

export default function Card ({ mode, article, toggleFavoriteCallback, unlinkTagCallback, openTagsLinkDialogCallback }: ICardProps) {
  return mode === VIEW_MODE.LIST ? (
    <ListCard
      article={article}
      toggleFavoriteCallback={toggleFavoriteCallback}
      unlinkTagCallback={unlinkTagCallback}
      openTagsLinkDialogCallback={openTagsLinkDialogCallback}
    />
  ) : (
    <GridCard
      article={article}
      toggleFavoriteCallback={toggleFavoriteCallback}
      unlinkTagCallback={unlinkTagCallback}
      openTagsLinkDialogCallback={openTagsLinkDialogCallback}
    />
  );
}