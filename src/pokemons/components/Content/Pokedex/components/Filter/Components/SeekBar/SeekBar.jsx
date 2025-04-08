import { useState } from "react";
import "./SeekBar.css";

export const SeekBar = ({ min, max, step, onChange }) => {
  const media = (min + max) / 2;
  const [value, setValue] = useState(media);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue); // Llama a la función onChange pasada como prop
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
      <p>Valor: {value}</p>
    </div>
  );
};
