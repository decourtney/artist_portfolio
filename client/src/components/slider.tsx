import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { AccountItem, CategoryItem } from "../utils/customClientTypes";

const baseCDN =
  process.env.BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface SliderProps {
  itemsToDisplay: AccountItem[] | CategoryItem[];
  numberToDisplay: number;
}

// These assertions are used to help determine if the clicked card is a category or collection.
// Then
function isAccountItem(item: AccountItem | CategoryItem): item is AccountItem {
  return "description" in item;
}

function isCategoryItem(
  item: AccountItem | CategoryItem
): item is CategoryItem {
  return "products" in item;
}

const Slider = ({ itemsToDisplay, numberToDisplay }: SliderProps) => {
  const { username: userParam } = useParams();
  const navigate = useNavigate();

  const handleOnClick = () => {};

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
        <SwiperSlide
          key={index}
          onClick={() => {
            if (isAccountItem(item))
              navigate(`/gallery/collection/${item.name}`);
            else
              navigate(`/gallery/category/${item.name}`);
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
