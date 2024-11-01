import Image from 'next/image';
import Link from 'next/link';

import { IArticle } from '@models/article';
import { MAX_DESCRIPTION_LENGTH } from '@utils/card';
import { formatDate } from '@utils/date';
import '@components/card/card.scss';
import './gridCard.scss';

interface IGridCardProps {
  article: IArticle;
}

export default function GridCard ({ article }: IGridCardProps) {
  const getDescription: string | undefined = article.description 
    ? article.description.length >= MAX_DESCRIPTION_LENGTH 
    ? `${article.description.substring(0, MAX_DESCRIPTION_LENGTH)} ...`
    : article.description
    : undefined

  return (
    <div className="gridCard">
      <div className='gridCard-image'>
        <Image
          src={article.image ?? '/icons/placeholder.svg'}
          alt={`Article ${article.id} image`}
          style={{ objectFit: 'contain' }}
          sizes='100%'
          priority
          fill
        />
      </div>
      <div className='gridCard-content'>
        <div className='gridCard-content-header'>
          <Link href={article.url} target='_blank'>
            <h3>{article.title}</h3>
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
        <div className='gridCard-content-description'>{getDescription}</div>
        <div className='gridCard-content-footer'>
          <div>Published on {formatDate(article.publicationDate)}</div>
          <Link href={article.website.url} target='_blank' className='gridCard-content-footer-website'>
            <div>By {article.website.name}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}