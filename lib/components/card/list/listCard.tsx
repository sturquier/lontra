import Image from 'next/image';
import Link from 'next/link';

import { IArticle } from '@models/article';
import { formatDate } from '@utils/date';
import '@components/card/card.scss';
import './listCard.scss';

interface IListCardProps {
  article: IArticle;
}

export default function ListCard ({ article }: IListCardProps) {
  return (
    <div className="listCard">
      <div className='listCard-image'>
        <Image
          src={article.image ?? '/icons/placeholder.svg'}
          alt={`Article ${article.id} image`}
          style={{ objectFit: 'contain' }}
          sizes='100%'
          priority
          fill
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
          <Link href={article.website.url} target='_blank' className='listCard-content-footer-website'>
            <div>By {article.website.name}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}