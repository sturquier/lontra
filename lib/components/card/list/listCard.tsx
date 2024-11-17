import Image from 'next/image';
import Link from 'next/link';

import { IArticle } from '@models/article';
import { formatDate } from '@utils/date';
import { Tag } from '@components/index';
import '@components/card/card.scss';
import './listCard.scss';

interface IListCardProps {
  article: IArticle;
  toggleFavoriteCallback: () => void;
  unlinkTagCallback: (id: string) => void;
}

export default function ListCard ({ article, toggleFavoriteCallback, unlinkTagCallback }: IListCardProps) {
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
            src={article.isFavorite ? '/icons/heart-fill.svg' : '/icons/heart.svg'}
            alt={article.isFavorite ? 'Heart fill icon' : 'Heart icon'}
            width={20}
            height={20}
            onClick={toggleFavoriteCallback}
          />
        </div>
        <div className='listCard-content-tags'>
          {article.tags.map((tag, index) => (
            <Tag key={index} onDeleteCallback={(): void => unlinkTagCallback(tag.id)}>{tag.label}</Tag>
          ))}
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