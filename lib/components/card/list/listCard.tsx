import Image from 'next/image';
import Link from 'next/link';

import { IArticle } from '@models/article';
import { MAX_DESCRIPTION_LENGTH } from '@utils/card';
import { formatDate } from '@utils/date';
import { Chip } from '@components/index';
import cardStyles from '@components/card/card.module.scss';
import styles from './listCard.module.scss';

interface IListCardProps {
  article: IArticle;
  toggleFavoriteCallback: () => void;
  unlinkTagCallback: (id: string) => void;
  openTagsLinkDialogCallback: () => void;
}

export default function ListCard ({ article, toggleFavoriteCallback, unlinkTagCallback, openTagsLinkDialogCallback }: IListCardProps) {
  const getDescription: string | undefined = article.description 
  ? article.description.length >= MAX_DESCRIPTION_LENGTH.LIST
  ? `${article.description.substring(0, MAX_DESCRIPTION_LENGTH.LIST)} ...`
  : article.description
  : undefined

  return (
    <div className={`${cardStyles.card} ${styles.listCard}`}>
      <div className={`${cardStyles['card-image']} ${styles['listCard-image']}`}>
        <Image
          src={article.image ?? '/icons/placeholder.svg'}
          alt={`Article ${article.id} image`}
          style={{ objectFit: 'contain' }}
          sizes='100%'
          priority
          fill
        />
      </div>
      <div className={`${cardStyles['card-content']} ${styles['listCard-content']}`}>
        <div className={`${cardStyles['card-content-header']} ${styles['listCard-content-header']}`}>
          <Link href={article.url} target='_blank'>
            <h3>{article.title}</h3>
          </Link>
          <div className={styles['listCard-content-header-icons']}>
            <Image
              className={styles['listCard-content-header-icons-favorite']}
              data-testid="listCard-favorite-icon"
              src={article.isFavorite ? '/icons/heart-fill.svg' : '/icons/heart.svg'}
              alt={article.isFavorite ? 'Heart fill icon' : 'Heart icon'}
              width={20}
              height={20}
              onClick={toggleFavoriteCallback}
            />
            <Image
              className={styles['listCard-content-header-icons-tagPlus']}
              data-testid="listCard-tag-icon"
              src={'/icons/tag-plus.svg'}
              alt={'Tag plus icon'}
              width={20}
              height={20}
              onClick={(): void => openTagsLinkDialogCallback()}
            />
          </div>
        </div>
        <div className={`${cardStyles['card-content-tags']} ${styles['listCard-content-tags']}`}>
          {article.tags.map((tag) => (
            <Chip key={tag.id} onDeleteCallback={(): void => unlinkTagCallback(tag.id)}>{tag.label}</Chip>
          ))}
        </div>
        <div className={`${cardStyles['card-content-description']} ${styles['listCard-content-description']}`}>{getDescription}</div>
        <div className={`${cardStyles['card-content-footer']} ${styles['listCard-content-footer']}`}>
          <div>Published on {formatDate(article.publicationDate)}</div>
          <Link href={article.website.url} target='_blank' className={`${cardStyles['card-content-footer-website']} ${styles['listCard-content-footer-website']}`}>
            <div>By {article.website.name}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}