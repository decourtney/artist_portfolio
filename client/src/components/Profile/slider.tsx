import React, { useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Grid,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  EffectFlip,
  EffectCards,
  EffectCoverflow,
  EffectCube,
  EffectCreative,
} from "swiper/modules";
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

const Slider = ({ accountItems, numberToDisplay }: CarouselProps) => {
  const { username: userParam } = useParams();

  console.log();
  // TODO Styles and anims
  return (
    <section className="flex w-full">
      {/* <div className="flex w-full"> */}
        <Swiper
          modules={[Grid, Navigation, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={numberToDisplay}
          grid={{ rows: 1 }}
          loop={true}
          loopAddBlankSlides={true}
          navigation
          // scrollbar={{ draggable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper: any) => console.log(swiper)}
        >
          {accountItems.map((item, index) => {
            {
              return item.image ? (
                <SwiperSlide key={index}>
                  <div className="w-fit p-2 rounded-lg bg-plight shadow-md">
                    <div className="flex justify-center items-center w-fit p-1 rounded-lg bg-slate-50 shadow-md">
                      <img
                        src={`${baseCDN}/${userParam}/${item.image}`}
                        className=""
                        alt={`Slide ${index}`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ) : (
                <SwiperSlide key={index}>
                  <div className=" w-full h-full p-1 rounded-lg bg-plight shadow-md">
                    <div
                      className="flex justify-center items-center w-full h-full rounded-lg bg-white shadow-md"
                      onClick={() => {}}
                    >
                      <div className="px-1 text-pdark font-bold text-[3vw]">
                        <span>{item.name}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      {/* </div> */}
    </section>
  );
};

export default Slider;
