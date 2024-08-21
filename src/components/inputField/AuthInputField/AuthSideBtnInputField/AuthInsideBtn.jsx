import "./AuthInsideBtn.css";

const AuthInsideBtn = ({ title, onClick, disabled = false }) => {
  return (
    <div className="AuthInsideBtn">
      <button onClick={onClick} disabled={disabled} className="insideButton">
        {title}
      </button>
    </div>
  );
};

export default AuthInsideBtn;
