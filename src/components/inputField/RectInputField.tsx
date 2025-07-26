import "./RectInputField.css";

interface RectInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  fontMode?: "default" | "12" | "xs";
}

const RectInputField: React.FC<RectInputFieldProps> = ({
  title,
  fontMode = "default",
  ...props
}) => {
  return (
    <div className="rect-input-field">
      <label htmlFor={title} className="h5-regular">
        {title}
      </label>
      <input
        className={
          fontMode === "default"
            ? "p-small-regular"
            : fontMode === "12"
            ? "p-12-400"
            : fontMode === "xs"
            ? "p-xs-regular"
            : "p-small-regular"
        }
        {...props}
      />
    </div>
  );
};

export default RectInputField;
