import "./RoundBtnLargeBold.scss";

const RoundBtnLargeBold = ({ children, onClick, type, color, disabled = false, style }) => {
  return color === "white" ? (
    <button
      className="large-bold-btn c-pointer p-large-bold c-main f-center"
      id="white"
      onClick={onClick}
      type={type}
      style={{ ...style }}
    >
      {children}
    </button>
  ) : color === "grey" || color === "gray" ? (
    <button
      className="large-bold-btn c-pointer p-large-bold c-white f-center"
      id="grey"
      onClick={onClick}
      type={type}
      style={{ ...style }}
    >
      {children}
    </button>
  ) : (
    <button
      className="large-bold-btn c-pointer p-large-bold c-white f-center"
      id="purple"
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{ ...style }}
    >
      {children}
    </button>
  );
};

export default RoundBtnLargeBold;
