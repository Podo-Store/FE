import "./RectInputField.css";

const RectInputField = ({ title, type, placeholder, value, onChange }) => {
  return (
    <div className="rect-input-field">
      <label for={title}>{title}</label>
      <input
        id={title}
        type={type}
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RectInputField;
