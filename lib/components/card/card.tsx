import { IArticle } from '@models/article';
import { VIEW_MODE } from '@utils/card';
import GridCard from './grid/gridCard';
import ListCard from './list/listCard';

interface ICardProps {
  mode: VIEW_MODE;
  article: IArticle;
  toggleFavoriteCallback: () => void;
}

export default function Card ({ mode, article, toggleFavoriteCallback }: ICardProps) {
  return mode === VIEW_MODE.LIST ? (
    <ListCard
      article={article}
      toggleFavoriteCallback={toggleFavoriteCallback}
    />
  ) : (
    <GridCard
      article={article}
      toggleFavoriteCallback={toggleFavoriteCallback}
    />
  );
}