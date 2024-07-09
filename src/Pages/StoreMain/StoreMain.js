import "./StoreMain.css";
import MainNav from "../MainNav";
import { dummy } from "../DummyData";
import Dummy from "../../Components/Dummy";

function StoreMain() {
  return (
    <div className="Store_Main_">
      <div className="app-container">
        {dummy.results.map((item) => {
          return (
            <Dummy
              title={item.title}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StoreMain;
