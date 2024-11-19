import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

import { API_PATH } from '@config/router';
import { CreateTagPayload } from '@models/tag';
import { useFetchTagsQuery } from '@store/features/tags/tags.query';
import { Button, FormInput, Loader, Tag } from '@components/index';
import styles from './tags.module.scss';

const CreateTagSchema: ZodType<CreateTagPayload> = z
  .object({
    label: z
      .string()
      .min(3, { message: "Label is too short" })
      .max(20, { message: "Label is too long" })
    ,
  })

export default function ProfileTagsTab () {
  const { data: tags, isFetching, refetch } = useFetchTagsQuery();

  const { register, reset, handleSubmit, formState: { isValid, errors } } = useForm<CreateTagPayload>({
    resolver: zodResolver(CreateTagSchema)
  })

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
        <div className={styles['profile-tags-content-creation']}>
          <div className={styles['profile-tags-content-creation-subtitle']}>Create a tag</div>
          <form className={styles['profile-tags-content-creation-form']} onSubmit={handleSubmit(createTag)}>
            <div className={styles['profile-tags-content-creation-form-row']}>
              <FormInput
                placeholder='Label'
                icon={{
                  src: '/icons/tag.svg',
                  alt: 'Tag icon'
                }}
                register={register('label')}
              />
              <div className={styles['profile-tags-content-creation-form-row-error']}>
                {errors.label && <span className={styles['profile-tags-content-creation-form-row-error-text']}>{errors.label.message}</span>}
              </div>
            </div>
            <Button type='submit' disabled={!isValid} className='submit'>CREATE</Button>
          </form>
        </div>
        <div className={styles['profile-tags-content-list']}>
          <div className={styles['profile-tags-content-list-subtitle']}>Tags list</div>
          {isFetching ? (
            <div className={styles['profile-tags-content-list-loader']}>
              <Loader />
            </div>
          ) : (
            <div className={styles['profile-tags-content-list-rows']}>
              {tags?.map((tag, index) => (
                <Tag key={index} onDeleteCallback={(): Promise<void> => deleteTag(tag.id)}>{tag.label}</Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}