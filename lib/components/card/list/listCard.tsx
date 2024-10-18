import Image from 'next/image';
import Link from 'next/link';

import { IArticle } from '@models/article';
import { formatDate } from '@utils/date';
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
          width={50}
          height={50}
        />
      </div>
      <div className='listCard-content'>
        <div className='listCard-content-header'>
          <Link href={article.url} target='_blank'>
            <h3>{article.title}</h3>
          </Link>
          <Image
            className='listCard-content-header-favorite'
            src='/icons/heart.svg'
            alt='Heart icon'
            width={20}
            height={20}
            onClick={(): void => console.log('TODO')}
          />
        </div>
        <div className='listCard-content-description'>{article.description}</div>
        <div className='listCard-content-footer'>
          <div>Published on {formatDate(article.publicationDate)}</div>
          <Link href={article.website.url} target='_blank'>
            <div>By {article.website.name}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}