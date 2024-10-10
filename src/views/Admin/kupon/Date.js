import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ onDateChange, onInputChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (onInputChange) {
      onInputChange(inputValue);
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="Select a date"
      value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
      name="customDate"
      onChangeRaw={handleInputChange}
    />
  );
};

const App = () => {
  const handleDateChange = (date) => {
    console.log("Selected date:", date);
  };

  const handleInputChange = (inputValue) => {
    console.log("Input value:", inputValue);
  };

  return (
    <div>
      <h1>Custom DatePicker Example</h1>
      <CustomDatePicker
        onDateChange={handleDateChange}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default App;
