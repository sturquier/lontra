import Image from 'next/image';

import { IArticle } from '@models/article';
import './listCard.scss';

interface IListCardProps {
  article: IArticle;
}

export default function ListCard ({ article }: IListCardProps) {
  return (
    <div className="listCard">
      <div className='listCard-image'>
        <Image
          src={article.image}
          alt={`Article ${article.id} image`}
          width={80}
          height={80}
        />
      </div>
      <div className='listCard-content'>
        <h4>{article.title}</h4>
        <div>{article.description}</div>
        <div className='listCard-content-publicationDate'>{article.publicationDate.toISOString().split('T')[0]}</div>
      </div>
    </div>
  )
}