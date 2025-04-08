import "./Checkbox.css"

export const Checkbox = ({ key, label, id, checked, onChange, value }) => {
    return (
        <li className={label} key={key}>
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