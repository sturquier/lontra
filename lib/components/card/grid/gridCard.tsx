import Image from 'next/image';
import Link from 'next/link';

import { IArticle } from '@models/article';
import { MAX_DESCRIPTION_LENGTH } from '@utils/card';
import { formatDate } from '@utils/date';
import '@components/card/card.scss';
import './gridCard.scss';

interface IGridCardProps {
  article: IArticle;
  toggleFavoriteCallback: () => void;
}

export default function GridCard ({ article, toggleFavoriteCallback }: IGridCardProps) {
  const getDescription: string | undefined = article.description 
    ? article.description.length >= MAX_DESCRIPTION_LENGTH 
    ? `${article.description.substring(0, MAX_DESCRIPTION_LENGTH)} ...`
    : article.description
    : undefined

  return (
    <div className="gridCard">
      <div className='gridCard-image'>
        <Image
          className='gridCard-image-background'
          src={article.image ?? '/icons/placeholder.svg'}
          alt={`Article ${article.id} image`}
          style={{ objectFit: 'contain', inset: 'inherit' }}
          sizes='100%'
          priority
          fill
        />
        <Image
          className='gridCard-image-favorite'
          src={article.isFavorite ? '/icons/heart-fill.svg' : '/icons/heart.svg'}
          alt={article.isFavorite ? 'Heart fill icon' : 'Heart icon'}
          width={20}
          height={20}
          onClick={toggleFavoriteCallback}
        />
      </div>
      <div className='gridCard-content'>
        <div className='gridCard-content-header'>
          <Link href={article.url} target='_blank'>
            <h3>{article.title}</h3>
          </Link>
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