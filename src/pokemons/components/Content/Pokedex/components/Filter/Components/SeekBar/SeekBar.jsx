import "./SeekBar.css";

export const SeekBar = ({ min, max, step, value, onChange }) => {

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
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
