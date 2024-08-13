import PriceTextsVertical from "./../price/PriceTextsVertical.jsx";
import "./ScriptContent.css";

const ScriptContent = ({ order, index, children }) => {
  const [dateParse] = new Date(order.createdAt).toISOString().split("T");

  return (
    <div key={index} className="script-content">
      <h3 id="date">{dateParse}</h3>
      <hr></hr>
      {order.orderItem.map((script) => (
        <div key={script.id}>
          <div className="script">
            <div
              className="script-thumbnail"
              style={{
                backgroundImage: `url(${script.imagePath || "default_image_url_here"})`,
              }}
            ></div>
            <div className="script-detail">
              <h3 id="title">{script.title || "제목 없음"}</h3>
              <hr></hr>
              <h4>{script.writer || "작가 정보 없음"}</h4>
              <PriceTextsVertical
                scriptPrice={script.scriptPrice || 0}
                performPrice={script.performancePrice || 0}
              />
              {children}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScriptContent;
