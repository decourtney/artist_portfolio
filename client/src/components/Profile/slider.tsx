import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Grid,
  Navigation,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { AccountItem } from "../../utils/customClientTypes";


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
  return (
    <Swiper
      modules={[Grid, Navigation, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={numberToDisplay}
      grid={{ rows: 1 }}
      loop={true}
      loopAddBlankSlides={true}
      centeredSlides={true}
      navigation
      freeMode={false}
      // scrollbar={{ draggable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: any) => console.log(swiper)}
    >
      {accountItems.map((item, index) => {
        {
          return item.image ? (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center w-full h-full p-1 rounded-lg bg-plight shadow-md">
                <div className="flex justify-center items-center w-full h-full p-1 rounded-lg bg-slate-50 shadow-md">
                  <img
                    src={`${baseCDN}/${userParam}/${item.image}`}
                    className="w-full"
                    alt={`Slide ${index}`}
                    loading="lazy"
                  />
                </div>
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center w-full h-full p-1 rounded-lg bg-plight shadow-md">
                <div
                  className="flex justify-center items-center w-full h-full p-1 rounded-lg bg-white shadow-md"
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
  );
};

export default Slider;
