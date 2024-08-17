import "./Select.css";

const Select = ({ value, onChange, children }) => {
  return (
    <select className="select" name="" id="option" value={value} onChange={onChange}>
      {children}
    </select>
  );
};

export default Select;
