import Image from 'next/image';
import Link from 'next/link';

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
        <div className='gridCard-content-header'>
          <Link href={article.url} target='_blank'>
            <h4>{article.title}</h4>
          </Link>
          <Image
            className='gridCard-content-header-favorite'
            src='/icons/heart.svg'
            alt='Heart icon'
            width={20}
            height={20}
            onClick={(): void => console.log('TODO')}
          />
        </div>
        <div className='gridCard-content-footer'>
          <div>Published on {formatDate(article.publicationDate)}</div>
          <Link href={article.website.url} target='_blank'>
            <div>By {article.website.name}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}