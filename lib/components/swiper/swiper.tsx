'use client';

import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';

import './swiper.scss';

interface ISwiperProps {
  slides: JSX.Element[];
}

export default function Swiper ({ slides }: ISwiperProps) {
  return (
    <SwiperReact
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView={2}
      breakpoints={{
        0: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        }
      }}
      pagination={{
        clickable: true
      }}
      data-testid="swiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          {slide}
        </SwiperSlide>
      ))}
    </SwiperReact>
  )
}