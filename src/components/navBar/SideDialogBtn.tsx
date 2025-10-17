import "./SideDialogBtn.css";

const SideDialogBtn = ({ ...props }) => {
  return (
    <button
      className="side-dialog-btn pl-[25px] sm:pl-[50px] w-full h-[50px] sm:h-[86px] p-small-regular sm:h3-regular text-start"
      {...props}
    ></button>
  );
};

export default SideDialogBtn;
