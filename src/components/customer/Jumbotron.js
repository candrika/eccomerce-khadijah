import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gambar1 from "../../assets/gambar1.jpg";
import gambar2 from "../../assets/gambar2.jpg";
import gambar3 from "../../assets/gambar3.jpg";

const Jumbotron = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <div className="App overflow-x-hidden overflow-y-hidden">
      <Slider {...settings}>
        <div className="h-[300px] md:h-[400px] lg:h-[600px] ">
          <img
            className="h-[300px] md:h-auto  w-full"
            src={gambar1}
            alt="Slide 1"
          />
        </div>
        <div className="h-[300px] md:h-[400px]  lg:h-[600px]">
          <img
            className="h-[300px] md:h-auto  w-full"
            src={gambar2}
            alt="Slide 2"
          />
        </div>
        <div className="h-[300px] md:h-[400px]  lg:h-[600px]">
          <img
            className="h-[300px] md:h-auto w-full"
            src={gambar3}
            alt="Slide 3"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Jumbotron;
