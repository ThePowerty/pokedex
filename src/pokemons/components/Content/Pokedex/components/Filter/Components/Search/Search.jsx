import "./Search.css";
import search from "../../../assets/search.png";

export const Search = ({ type, placeholder, value, onChange, onClick, onKeyDown }) => {
  return (
    <div className="search">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button onClick={onClick}>
        <img src={search} alt="search" />
      </button>
    </div>
  );
};
