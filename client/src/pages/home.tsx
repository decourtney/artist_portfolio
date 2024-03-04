import React, { useEffect, useRef, lazy } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { resetStore } from "../redux/resetStore";
import { motion } from "framer-motion";

import mountains from "../images/mountains.jpg";

const Home = () => {
  const dispatch = useAppDispatch();

  dispatch(resetStore());
  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center w-full h-full min-h-screen max-h-screen bg-secondary -z-10"
    >
      <div className="relative w-[50%] h-24 bg-blue-400">
        <div className="absolute right-full flex w-fit h-72 mt-10 p-1 space-x-1 bg-slate-500">

          <div className="absolute right-full flex w-fit h-64 mt-10 p-1 space-x-1 bg-purple-500 z-50">
            <div className="w-[25px] h-full bg-green-400"></div>
          </div>

          <div className="w-[25px] h-full bg-red-400"></div>
          <div className="w-[25px] h-full bg-red-400"></div>
          <div className="w-[25px] h-full bg-red-400"></div>
          <div className="w-[25px] h-full bg-red-400"></div>
        </div>

        <div className="absolute left-1/2 flex w-fit h-72 mt-10 p-1 space-x-1 bg-slate-500">
          <div className="w-[25px] h-full bg-red-400"></div>
          <div className="w-[25px] h-full bg-red-400"></div>
          <div className="w-[25px] h-full bg-red-400"></div>
          <div className="w-[25px] h-full bg-red-400"></div>
        </div>

        <div className="absolute left-full flex w-fit h-72 mt-10 p-1 space-x-1 bg-slate-500">
          <div className="w-[25px] h-full bg-red-400"></div>
          <div className="w-[25px] h-full bg-red-400"></div>
          <div className="w-[25px] h-full bg-red-400"></div>
          <div className="w-[25px] h-full bg-red-400"></div>

          <div className="absolute left-full flex w-fit h-64 mt-10 p-1 space-x-1 bg-orange-500 z-50">
            <div className="w-[25px] h-full bg-green-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
