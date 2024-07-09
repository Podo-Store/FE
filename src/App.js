import "./App.css";
import mainImg from "./assets/image/mainImg.svg";
import MainNav from "./Pages/MainNav";
import Footer from "./Pages/Footer";

function App() {
  return (
    <div className="App">
      <MainNav />
      <div className="main_body">
        <img src={mainImg} alt="Main Img"></img>
      </div>
      <Footer />
    </div>
  );
}

export default App;
