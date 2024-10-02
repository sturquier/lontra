import { IArticle } from '@models/article';
import './card.scss';

interface ICardProps {
  article: IArticle;
}

export default function Card ({ article }: ICardProps) {
  return (
    <div className="card">
      <div>{article.title}</div>
      <div>{article.description}</div>
    </div>
  )
}