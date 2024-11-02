import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

import { CreateCategoryPayload } from '@models/category';
import { useFetchCategoriesQuery } from '@store/features/categories/categories.query';
import { categoryPath } from '@utils/category';
import { Button, FormInput, Loader } from '@components/index';
import './categories.scss';

const CreateCategorySchema: ZodType<CreateCategoryPayload> = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name is too short" })
      .max(20, { message: "Name is too long" })
    ,
  })

export default function ProfileCategoriesTab () {
  const { data: categories, isFetching, refetch } = useFetchCategoriesQuery();

  const { register, reset, handleSubmit, formState: { isValid, errors } } = useForm<CreateCategoryPayload>({
    resolver: zodResolver(CreateCategorySchema)
  })

  const createCategory: SubmitHandler<CreateCategoryPayload> = async (payload) => {
    const { name } = payload;

    const response = await fetch(categoryPath, {
      method: 'POST',
      body: JSON.stringify({ name })
    });

    if (response.ok) {
      reset();
      refetch();
    }
  }

  const deleteCategory = async (id: string): Promise<void> => {
    const response = await fetch(categoryPath, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      refetch();
    }
  }

  return (
    <div className='profile-categories'>
      <h2 className='profile-categories-title'>Categories</h2>
      <div className='profile-categories-content'>
        <div className='profile-categories-content-list'>
          <div className='profile-categories-content-list-subtitle'>Categories list</div>
          {isFetching ? (
            <div className='profile-categories-content-list-loader'>
              <Loader />
            </div>
          ) : (
            <div className='profile-categories-content-list-rows'>
              {categories?.map((category, index) => (
                <div key={index} className='profile-categories-content-list-rows-row'>
                  {category.name}
                  <Image
                    className='profile-categories-content-list-rows-row-icon'
                    src="/icons/delete.svg"
                    alt="Delete icon"
                    width={20}
                    height={20}
                    onClick={(): Promise<void> => deleteCategory(category.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='profile-categories-content-creation'>
          <div className='profile-categories-content-creation-subtitle'>Create a category</div>
          <form className='profile-categories-content-creation-form' onSubmit={handleSubmit(createCategory)}>
            <div className='profile-categories-content-creation-form-row'>
              <FormInput
                placeholder='Name'
                icon={{
                  src: '/icons/tag.svg',
                  alt: 'Tag icon'
                }}
                register={register('name')}
              />
              <div className='profile-categories-content-creation-form-row-error'>
                {errors.name && <span className='profile-categories-content-creation-form-row-error-text'>{errors.name.message}</span>}
              </div>
            </div>
            <Button type='submit' disabled={!isValid} className='submit'>CREATE</Button>
          </form>
        </div>
      </div>
    </div>
  )
}