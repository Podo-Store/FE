import "./OnOffBtn.css";
import "./../../styles/text.css";

const OnOffBtn = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="on-off-btn">
      <p className="p-large-bold c-white">{text}</p>
    </button>
  );
};

export default OnOffBtn;
