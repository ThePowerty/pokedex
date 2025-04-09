import "./Checkbox.css"

export const Checkbox = ({ index, label, id, checked, onChange, value }) => {
    return (
        <li className={label} key={index}>
          <label>
            {label}
            <input
              type="checkbox"
              id={id}
              value={value}
              checked={checked}
              onChange={onChange}
            />
          </label>
        </li>
      );
}