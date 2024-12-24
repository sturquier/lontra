import Image from 'next/image';
import Link from 'next/link';

import { IArticle } from '@models/article';
import { MAX_DESCRIPTION_LENGTH } from '@utils/card';
import { formatDate } from '@utils/date';
import { Tag } from '@components/index';
import cardStyles from '@components/card/card.module.scss';
import styles from './gridCard.module.scss';

interface IGridCardProps {
  article: IArticle;
  toggleFavoriteCallback: () => void;
  unlinkTagCallback: (id: string) => void;
  openTagsLinkDialogCallback: () => void;
}

export default function GridCard ({ article, toggleFavoriteCallback, unlinkTagCallback, openTagsLinkDialogCallback }: IGridCardProps) {
  const getDescription: string | undefined = article.description 
    ? article.description.length >= MAX_DESCRIPTION_LENGTH 
    ? `${article.description.substring(0, MAX_DESCRIPTION_LENGTH)} ...`
    : article.description
    : undefined

  return (
    <div className={`${cardStyles.card} ${styles.gridCard}`}>
      <div className={`${cardStyles['card-image']} ${styles['gridCard-image']}`}>
        <Image
          className={styles['gridCard-image-background']}
          src={article.image ?? '/icons/placeholder.svg'}
          alt={`Article ${article.id} image`}
          style={{ objectFit: 'contain', inset: 'inherit' }}
          sizes='100%'
          priority
          fill
        />
        <div className={styles['gridCard-image-icons']}>
          <Image
            className={styles['gridCard-image-icons-favorite']}
            src={article.isFavorite ? '/icons/heart-fill.svg' : '/icons/heart.svg'}
            alt={article.isFavorite ? 'Heart fill icon' : 'Heart icon'}
            width={20}
            height={20}
            onClick={toggleFavoriteCallback}
          />
          <Image
            className={styles['gridCard-image-icons-tagPlus']}
            src={'/icons/tag-plus.svg'}
            alt={'Tag plus icon'}
            width={20}
            height={20}
            onClick={(): void => openTagsLinkDialogCallback()}
          />
        </div>
      </div>
      <div className={`${cardStyles['card-content']} ${styles['gridCard-content']}`}>
        <div className={`${cardStyles['card-content-header']} ${styles['gridCard-content-header']}`}>
          <Link href={article.url} target='_blank'>
            <h3>{article.title}</h3>
          </Link>
        </div>
        <div className={`${cardStyles['card-content-tags']} ${styles['gridCard-content-tags']}`}>
          {article.tags.map((tag) => (
            <Tag key={tag.id} onDeleteCallback={(): void => unlinkTagCallback(tag.id)}>{tag.label}</Tag>
          ))}
        </div>
        <div className={`${cardStyles['card-content-description']} ${styles['gridCard-content-description']}`}>{getDescription}</div>
        <div className={`${cardStyles['card-content-footer']} ${styles['gridCard-content-footer']}`}>
          <div>Published on {formatDate(article.publicationDate)}</div>
          <Link href={article.website.url} target='_blank' className={`${cardStyles['card-content-footer-website']} ${styles['gridCard-content-footer-website']}`}>
            <div>By {article.website.name}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}