import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setProductState } from "../redux/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { Product, Category } from "../utils/customClientTypes";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface SliderProps {
  handleOnClickItem: (item: Product | Category) => void;
  itemsToDisplay: Product[] | Category[];
  numberToDisplay: number;
  isCenteredSlides?: boolean;
  displayDirection?: "horizontal" | "vertical" | undefined;
}

const Slider = ({
  handleOnClickItem,
  itemsToDisplay,
  numberToDisplay,
  isCenteredSlides,
  displayDirection,
}: SliderProps) => {
  let { username: userParam } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  return (
    <Swiper
      modules={[Grid, Navigation, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={numberToDisplay}
      grid={{ fill: "column", rows: 1 }}
      // loop={true}
      // loopAddBlankSlides={true}
      centeredSlides={isCenteredSlides}
      navigation
      freeMode={false}
      direction={displayDirection}
      // autoHeight={true}
      // scrollbar={{ draggable: true }}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper: any) => console.log(swiper)}
      className=" bg-red-400"
    >
      {itemsToDisplay.map((item, index) => (
        <SwiperSlide
          key={index}
          onClick={() => {
            handleOnClickItem(item);
          }}
        >
          <div className="w-full p-1 rounded-md shadow-md bg-orange-400">
            {item.image ? (
              <img
                src={`${baseCDN}/${userParam}/${item.image}`}
                className="inline-block w-full h-auto"
                alt={`${item.name}`}
                loading="lazy"
              />
            ) : (
              <div className="px-1 text-pdark font-bold text-[3vw]">
                <span>{item.name}</span>
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
