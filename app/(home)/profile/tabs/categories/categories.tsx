import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

import { CreateCategoryPayload, ICategory } from '@models/category';
import { Button, FormInput } from '@components/index';
import './categories.scss';

const CreateCategorySchema: ZodType<CreateCategoryPayload> = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name is too short" })
    ,
  })

interface IProfileCategoriesTabProps {
  categories: ICategory[];
}

export default function ProfileCategoriesTab ({ categories }: IProfileCategoriesTabProps) {
  const { register, handleSubmit, formState: { isValid, errors } } = useForm<CreateCategoryPayload>({
    resolver: zodResolver(CreateCategorySchema)
  })

  const onSubmit: SubmitHandler<CreateCategoryPayload> = async (payload) => {
    const { name } = payload;

    console.log(name)
  }

  return (
    <div className='profile-categories'>
      <h2 className='profile-categories-title'>Categories</h2>
      <div className='profile-categories-content'>
        <div className='profile-categories-content-list'>
          <div className='profile-categories-content-list-subtitle'>Categories list</div>
          <div className='profile-categories-content-list-rows'>
            {categories.map((category, index) => (
              <div key={index} className='profile-categories-content-list-rows-row'>
                {category.name}
                <Image
                  src="/icons/clear.svg"
                  alt="Clear icon"
                  width={20}
                  height={20}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='profile-categories-content-creation'>
          <div className='profile-categories-content-creation-subtitle'>Create a category</div>
          <form className='profile-categories-content-creation-form' onSubmit={handleSubmit(onSubmit)}>
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