import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { AccountItem } from "../../utils/customClientTypes";

const baseCDN =
  process.env.BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface SliderProps {
  itemsToDisplay: AccountItem[];
  numberToDisplay: number;
}

const Slider = ({ itemsToDisplay, numberToDisplay }: SliderProps) => {
  const { username: userParam } = useParams();

  return (
    <Swiper
      modules={[Grid, Navigation, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={numberToDisplay}
      grid={{ rows: 1 }}
      // loop={true}
      loopAddBlankSlides={true}
      centeredSlides={true}
      navigation
      freeMode={false}
      // scrollbar={{ draggable: true }}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper: any) => console.log(swiper)}
    >
      {itemsToDisplay.map((item, index) => (
        <SwiperSlide key={index} onClick={() => console.log(item)}>
          <div className="flex justify-center items-center w-full h-full p-1 rounded-lg bg-plight shadow-md">
            <div className="flex justify-center items-center w-full h-full p-1 rounded-lg bg-slate-50 shadow-md">
              {item.image ? (
                <img
                  src={`${baseCDN}/${userParam}/${item.image}`}
                  className="w-full"
                  alt={`Slide ${index}`}
                  loading="lazy"
                />
              ) : (
                <div className="px-1 text-pdark font-bold text-[3vw]">
                  <span>{item.name}</span>
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
