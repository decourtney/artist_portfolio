import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Carousel } from "flowbite-react";
import image1 from "../../images/artroom.jpg";
import image2 from "../../images/gallery_hall.jpg";
import image3 from "../../images/profile_pic.png";

const ProfileCarousel = () => {
  return (
    <Carousel slide={false} indicators={false}>
      <div className="flex">
        <img src={image1} />
        {/* <p className="legend">Legend 1</p> */}
      </div>

      <div>
        <img src={image2} />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div>
        {" "}
        <img src={image3} className="w-full " />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
  );
};

export default ProfileCarousel;
