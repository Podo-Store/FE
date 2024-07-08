import './App.css';
import mainSampleImg from './assets/image/mainsampleimg.png';
import MainNav from './Pages/MainNav';

function App() {
  return (
    <div className="App">
      <MainNav />
      <div className="main_body">
        <img src={mainSampleImg} alt="Main Img"></img>
      </div>
      <div className="main_footer"> </div>
    </div>
  );
}

export default App;
