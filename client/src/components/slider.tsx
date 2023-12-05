import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { Product, Category } from "../utils/customClientTypes";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface SliderProps {
  itemsToDisplay: Product[] | Category[];
  numberToDisplay: number;
  isCenteredSlides: boolean;
}

// These assertions are used to help determine if the clicked card is a category or collection.
// Then
function isProduct(item: Product | Category): item is Product {
  return "description" in item;
}

function isCategory(item: Product | Category): item is Category {
  return "products" in item;
}

const Slider = ({
  itemsToDisplay,
  numberToDisplay,
  isCenteredSlides,
}: SliderProps) => {
  let { username: userParam } = useParams();
  const navigate = useNavigate();

  if(!userParam)
    userParam = 'donovancourtney'

  const handleOnClick = () => {};

  return (
    <Swiper
      modules={[Grid, Navigation, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={numberToDisplay}
      grid={{ rows: 1 }}
      // loop={true}
      loopAddBlankSlides={true}
      centeredSlides={isCenteredSlides}
      navigation
      freeMode={false}
      // scrollbar={{ draggable: true }}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper: any) => console.log(swiper)}
    >
      {itemsToDisplay.map((item, index) => (
        <SwiperSlide
          key={index}
          onClick={() => {
            if (isProduct(item)) navigate(`/gallery/${item.name}`);
            else navigate(`/gallery/c/${item.name}`);
          }}
        >
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
