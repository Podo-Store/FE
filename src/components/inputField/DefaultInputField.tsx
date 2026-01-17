interface RectInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  className?: string;
}

const DefaultInputField: React.FC<RectInputFieldProps> = ({
  title,
  className,
  ...props
}) => {
  return (
    <div className="border-[0.5px] border-[var(--grey4)] rounded-[5px] px-[10px] flex h-[26px]">
      <input
        className={`${className} w-full p-xs-regular focus:outline-none`}
        {...props}
      />
    </div>
  );
};

export default DefaultInputField;
