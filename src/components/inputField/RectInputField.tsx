import "./RectInputField.css";

const RectInputField = ({ title, ...props }: { title?: string }) => {
  return (
    <div className="rect-input-field">
      <label htmlFor={title} className="h5-regular">
        {title}
      </label>
      <input {...props} />
    </div>
  );
};

export default RectInputField;
