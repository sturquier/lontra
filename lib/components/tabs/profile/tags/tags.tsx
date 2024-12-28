import { useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

import { API_PATH } from '@config/router';
import { CreateTagPayload } from '@models/tag';
import { useFetchTagsQuery } from '@store/features/tags/tags.query';
import { Button, FormInput, Loader, Tag } from '@components/index';
import styles from './tags.module.scss';

enum SECTION_KEY {
  LIST = 'list',
  FORM = 'form'
}

const CreateTagSchema: ZodType<CreateTagPayload> = z
  .object({
    label: z
      .string()
      .min(3, { message: "Label is too short" })
      .max(20, { message: "Label is too long" })
    ,
  })

export default function ProfileTagsTab () {
  const [sections, setSections] = useState<{ key: SECTION_KEY, isOpened: boolean }[]>([
    { key: SECTION_KEY.LIST, isOpened: true },
    { key: SECTION_KEY.FORM, isOpened: false }
  ])

  const { data: tags, isFetching, refetch } = useFetchTagsQuery();

  const { register, reset, handleSubmit, formState: { isValid, errors } } = useForm<CreateTagPayload>({
    resolver: zodResolver(CreateTagSchema)
  })

  const toggleSection = (key: SECTION_KEY): void => {
    setSections(sections.map(section => section.key === key ? { ...section, isOpened: !section.isOpened } : { ...section, isOpened: false }))
  }

  const isOpenedSection = (key: SECTION_KEY): boolean => sections.find(section => section.key === key)?.isOpened ?? false;

  const createTag: SubmitHandler<CreateTagPayload> = async (payload) => {
    const { label } = payload;

    const response = await fetch(API_PATH.TAGS, {
      method: 'POST',
      body: JSON.stringify({ label })
    });

    if (response.ok) {
      reset();
      refetch();
    }
  }

  const deleteTag = async (id: string): Promise<void> => {
    const response = await fetch(API_PATH.TAGS, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      refetch();
    }
  }

  return (
    <div className={styles['profile-tags']}>
      <h2 className={styles['profile-tags-title']}>Tags</h2>
      <div className={styles['profile-tags-content']}>
        <div className={styles['profile-tags-content-toggles']}>
          <div 
            className={styles['profile-tags-content-toggles-toggle']}
            onClick={(): void => toggleSection(SECTION_KEY.LIST)}
          >
            <div className={styles['profile-tags-content-toggles-toggle-icon']}>
              <Image
                src={'/icons/caret-right.svg'}
                alt={'Caret right icon'}
                width={24}
                height={24}
              />
            </div>
            <h4 className={`${styles['profile-tags-content-toggles-toggle-title']} ${isOpenedSection(SECTION_KEY.LIST) ? styles['profile-tags-content-toggles-toggle-title-active'] : ''}`}>List existing tags</h4>
          </div>
          <div 
            className={styles['profile-tags-content-toggles-toggle']} 
            onClick={(): void => toggleSection(SECTION_KEY.FORM)}
          >
            <div className={styles['profile-tags-content-toggles-toggle-icon']}>
              <Image
                src={'/icons/caret-right.svg'}
                alt={'Caret right icon'}
                width={24}
                height={24}
              />
            </div>
            <h4 className={`${styles['profile-tags-content-toggles-toggle-title']} ${isOpenedSection(SECTION_KEY.FORM) ? styles['profile-tags-content-toggles-toggle-title-active'] : ''}`}>Create a new tag</h4>
          </div>
        </div>
        <div className={styles['profile-tags-content-section']}>
          {isOpenedSection(SECTION_KEY.LIST) && (
            <div className={styles['profile-tags-content-section-list']}>
              <h3 className={styles['profile-tags-content-section-list-subtitle']}>List existing tags</h3>
              {isFetching ? (
                <div className={styles['profile-tags-content-section-list-loader']}>
                  <Loader />
                </div>
              ) : (
                <div className={styles['profile-tags-content-section-list-rows']}>
                  {tags?.map((tag) => (
                    <Tag key={tag.id} onDeleteCallback={(): Promise<void> => deleteTag(tag.id)}>{tag.label}</Tag>
                  ))}
                </div>
              )}
            </div>
          )}
          {isOpenedSection(SECTION_KEY.FORM) && (
            <div className={styles['profile-tags-content-section-create']}>
              <h3 className={styles['profile-tags-content-section-create-subtitle']}>Create a new tag</h3>
              <form className={styles['profile-tags-content-section-create-form']} onSubmit={handleSubmit(createTag)}>
                <div className={styles['profile-tags-content-section-create-form-row']}>
                  <FormInput
                    placeholder='Label'
                    icon={{
                      src: '/icons/tag.svg',
                      alt: 'Tag icon'
                    }}
                    register={register('label')}
                  />
                  <div className={styles['profile-tags-content-section-create-form-row-error']}>
                    {errors.label && <span className={styles['profile-tags-content-section-create-form-row-error-text']}>{errors.label.message}</span>}
                  </div>
                </div>
                <Button type='submit' disabled={!isValid} className='submit'>CREATE</Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}