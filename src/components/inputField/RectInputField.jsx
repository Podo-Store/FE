import "./RectInputField.css";

const RectInputField = ({ title, type, placeholder, value, onChange, readOnly = false }) => {
  return (
    <div className="rect-input-field">
      <label for={title} className="h5-regular">
        {title}
      </label>
      <input
        id={title}
        type={type}
        className="p-small-regular"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default RectInputField;
