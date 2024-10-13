import { IArticle } from '@models/article';
import { VIEW_MODE } from '@utils/card';
import GridCard from './grid/gridCard';
import ListCard from './list/listCard';

interface ICardProps {
  article: IArticle;
  mode: VIEW_MODE;
}

export default function Card ({ article, mode }: ICardProps) {
  return mode === VIEW_MODE.LIST ? (
    <ListCard article={article} />
  ) : (
    <GridCard article={article} />
  );
}