'use client';

import { useState, useEffect, MouseEvent, MutableRefObject } from 'react';
import Image from 'next/image';

import { IArticle } from '@models/article';
import { ITag } from '@models/tag';
import { Button, Dropdown } from '@components/index';
import modalStyles from '@components/modal/modal.module.scss';
import styles from './tagsModal.module.scss';

interface ITagsModalProps {
  dialogRef: MutableRefObject<HTMLDialogElement | null>;
  article: IArticle | null;
  tags: ITag[];
  articleTags: string[];
  onLinkTagsCallback: (linkedTags: string[]) => void;
  onCloseCallback: () => void;
}

export default function TagsModal ({ dialogRef, article, tags, articleTags, onLinkTagsCallback, onCloseCallback }: ITagsModalProps) {
  const [modalTags, setModalTags] = useState<string[]>([]);

  useEffect(() => {
    setModalTags(articleTags);
  }, [articleTags]);

  const closeModal = (): void => {
    setModalTags(articleTags);
    onCloseCallback();
  }

  const linkTags = (): void => {
    onLinkTagsCallback(modalTags);
    onCloseCallback();
  }

  return (
    <dialog className={`${modalStyles.modal} ${styles.tagsModal}`} ref={dialogRef} onClick={closeModal}>
      <div className={`${modalStyles['modal-content']} ${styles['tagsModal-content']}`} onClick={(event: MouseEvent<HTMLDivElement>): void => event.stopPropagation()}>
        <div className={`${modalStyles['modal-content-title']} ${styles['tagsModal-content-title']}`}>
          <h3>Link tags</h3>
          <Image
            className={`${modalStyles['modal-content-title-icon']} ${styles['tagsModal-content-title-icon']}`}
            src={'/icons/clear.svg'}
            alt='Clear icon'
            width={25}
            height={25}
            onClick={closeModal}
          />
        </div>
        <div className={styles['tagsModal-content-article']}>{article?.title}</div>
        <div className={styles['tagsModal-content-list']}>
          <Dropdown
            placeholder="Select tags"
            options={tags.map(tag => ({ value: tag.id, label: tag.label }))}
            selectedOptions={modalTags}
            onChangeCallback={(options): void => setModalTags(options.map(option => option.value))}
          />
        </div>
        <div className={`${modalStyles['modal-content-footer']} ${styles['tagsModal-content-footer']}`}>
          <Button onClickCallback={closeModal} className='secondary'>CANCEL</Button>
          <Button onClickCallback={linkTags}>LINK TAGS</Button>
        </div>
      </div>
    </dialog>
  )
}