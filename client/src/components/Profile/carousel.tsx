import React, { useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, EffectFlip, EffectCards, EffectCoverflow, EffectCube, EffectCreative } from "swiper/modules";
import ImageCard from "./imageCard";
import { AccountItem } from "../../utils/customClientTypes";
import "swiper/css";
import "swiper/css/bundle";

const baseCDN =
  process.env.BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface CarouselProps {
  accountItems: AccountItem[];
  numberToDisplay: number;
}

const Carousel = ({ accountItems, numberToDisplay }: CarouselProps) => {
  const { username: userParam } = useParams();

  console.log();
  // TODO Styles and anims
  return (
    <section className="flex flex-grow justify-center items-center overflow-hidden">
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={3}
          loop={true}
          navigation
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper: any) => console.log(swiper)}
        >
          {accountItems.map((item, index) => (
            <SwiperSlide key={index}>
              <LazyLoadImage
                src={`${baseCDN}/${userParam}/${item.image}`}
                className="w-full"
                alt={`Slide ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Carousel;
