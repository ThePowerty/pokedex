import "./Checkbox.css"

export const Checkbox = ({ label, id, checked, onChange, value }) => {
    return (
        <li className={label}>
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