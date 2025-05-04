import clsx from "clsx";

import "./Select.css";

const Select = ({ children, className, id, ...props }) => {
  return (
    <select className={clsx("__select", className)} name="" id={clsx("option", id)} {...props}>
      {children}
    </select>
  );
};

export default Select;
