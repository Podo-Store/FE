import "./AuthInsideBtn.scss";

const AuthInsideBtn = ({ title, onClick, disabled = false }, style) => {
  return (
    <div className="AuthInsideBtn">
      <button onClick={onClick} disabled={disabled} className="insideButton">
        {title}
      </button>
    </div>
  );
};

export default AuthInsideBtn;
