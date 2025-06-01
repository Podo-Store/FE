import clsx from "clsx";

import "./Select.css";

type SelectProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ children, className, id, ...props }: SelectProps) => {
  return (
    <select
      className={clsx("__select", className)}
      name=""
      id={clsx("option", id)}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
