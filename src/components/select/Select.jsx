import "./Select.css";

const Select = ({ value, onChange, style, children }) => {
  return (
    <select
      className="select"
      name=""
      id="option"
      value={value}
      onChange={onChange}
      style={{ ...style }}
    >
      {children}
    </select>
  );
};

export default Select;
