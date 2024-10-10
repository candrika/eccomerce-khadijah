import React, { useState, useEffect } from "react";
import axios from "axios";

function SliderContent({ activeIndex, sliderImage }) {
  const [image, setImage] = useState([]);

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/markets"
      );
      console.log(
        "response banner",
        response.data.setting_general.data.banners
      );
      setImage(response.data.setting_general.data.banners);
    } catch (error) {
      console.log("error banner", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <section>
      {image.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          {/* <img className="slide-image" src={slide.urls} alt="" /> */}
          <img className="slide-image " src={slide} alt={image} />
          <h2 className="slide-title">{slide.title}</h2>
          <h3 className="slide-text">{slide.description}</h3>
        </div>
      ))}
    </section>
  );
}

export default SliderContent;
