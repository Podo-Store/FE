import PriceTextsVertical from "./../price/PriceTextsVertical.jsx";
import "./ScriptContent.css";

const ScriptContent = ({ order, index, currentPage = "0", Button }) => {
  const items = currentPage === "0" ? order.orders || [] : order.products || [];

  return (
    <div key={index} className="script-content">
      <h3 id="date">{order.date}</h3>
      <hr></hr>
      {items.map((script) => (
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
              {/* Button: props */}
              {currentPage === "0" ? (
                <Button
                  contractStatus={script.contractStatus}
                  id={script.id}
                  title={script.title}
                />
              ) : (
                <Button
                  scriptSale={script.script}
                  performSale={script.performance}
                  id={script.id}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScriptContent;
