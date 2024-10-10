import React from "react";
import HeroSlider, { Slide } from "hero-slider";

const image1 =
  "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/fb/e2/32c272ba40729aa86d4e25564d9f/vegetables._TTW_._CR1,0,2278,1282_._SR1500,844_._QL100_.jpg";

const image2 =
  "https://www.realsimple.com/thmb/awOyS0S8hk6AdWDiMLAjfX161HA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vegetables-in-season-GettyImages-1456403368-5b2f4b5f8fe845bda5c64df8425f4a93.jpg";
const image3 =
  "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2018/12/vegetables.jpg";

const SliderImage = () => {
  return (
    <HeroSlider
      slidingAnimation="left_to_right"
      orientation="horizontal"
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log("onBeforeChange", nextSlide)
      }
      onChange={(nextSlide) => console.log("onChange", nextSlide)}
      onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
      style={{
        backgroundColor: "red",
        height: "40px  !important",
        width: "30px",
      }}
      settings={{
        slidingDuration: 500,
        slidingDelay: 200,
        sliderColor: "inherit",
        sliderFadeInDuration: 100,
        navbarFadeInDuration: 1000,
        navbarFadeInDelay: 500,
        isSmartSliding: true,
        shouldDisplayButtons: true,
        shouldAutoplay: true,
        shouldSlideOnArrowKeypress: false,
        autoplayDuration: 8000,
        autoplayHandlerTimeout: 1000,
        width: "100%",
        height: "40%  !important",
      }}
    >
      <Slide
        background={{
          backgroundImageSrc: image1,
          backgroundPosition: "center top",
          backgroundSize: "cover",
          width: "100%",
          height: "50%",
        }}
      />
      <Slide
        background={{
          backgroundImageSrc: image2,
          backgroundPosition: "center top",
          width: "100%",
          height: "100%",
        }}
      />
      <Slide
        background={{
          backgroundImageSrc: image3,
          backgroundPosition: "center top",
          backgroundSize: "cover",
          width: "100%",
          height: "50%",
        }}
      />
    </HeroSlider>
  );
};

export default SliderImage;
