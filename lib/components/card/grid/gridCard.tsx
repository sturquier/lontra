import Image from 'next/image';

import { IArticle } from '@models/article';
import { formatDate } from '@utils/date';
import './gridCard.scss';

interface IGridCardProps {
  article: IArticle;
}

export default function GridCard ({ article }: IGridCardProps) {
  return (
    <div className="gridCard">
      <div className='gridCard-image'>
        <Image
          src={article.image}
          alt={`Article ${article.id} image`}
          width={40}
          height={40}
        />
      </div>
      <div className='gridCard-content'>
        <h4>{article.title}</h4>
        <div className='gridCard-content-publicationDate'>{formatDate(article.publicationDate)}</div>
      </div>
    </div>
  )
}