import "./RectInputField.css";

interface RectInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

const RectInputField: React.FC<RectInputFieldProps> = ({ title, ...props }) => {
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
