import React, { useState, useEffect } from "react";

const FontPicker = () => {
  // State to store the list of fonts and the selected font
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");

  // Fetch font data (optional, you can use any other font library or static data)
  useEffect(() => {
    fetch(
      "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBW2oKR3TvTDxLqi28-GUk3LcKWF0Em06Q"
    )
      .then((response) => response.json())
      .then((data) => {
        setFonts(data.items.map((item) => item.family));
      })
      .catch((error) => console.error("Error fetching fonts:", error));
  }, []);

  // Handler for selecting a font
  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  return (
    <div className="font-picker">
      <select
        value={selectedFont}
        onChange={handleFontChange}
        className="border"
      >
        <option value="">Select a font</option>
        {fonts.map((font, index) => (
          <option key={index} value={font}>
            {font}
          </option>
        ))}
      </select>
      <p style={{ fontFamily: selectedFont }}>
        This is some sample text with the selected font.
      </p>
    </div>
  );
};

export default FontPicker;
