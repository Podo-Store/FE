import "./OnOffBtn.css";
import "./../../styles/text.css";

const OnOffBtn = ({ text, onClick, disabled, style }) => {
  return (
    <button onClick={onClick} className="on-off-btn" disabled={disabled} style={{ ...style }}>
      <p className="p-large-bold c-white">{text}</p>
    </button>
  );
};

export default OnOffBtn;
