import "./MainVer1.css";
import firstImage from '../assets/image/LangPageDownArrow.svg';

const MainVer1 = () => {
  return (
    <div className="background-container">
      <div id="a1"></div>
      
      <div id="title">
        <div id="purple-rectangle"></div>

        <h1>대본과 공연권 거래<br></br>저희가 도와드릴게요!</h1>
      </div>
      
      <img src={firstImage} alt="First"/>
    
    
    </div>
    
  );
};

export default MainVer1;
