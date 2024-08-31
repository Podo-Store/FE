import "./App.css";
import MainNav from "./pages/MainNav";
// import Main from "./pages/Main";
import NewMain from "./pages/NewMain";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="App">
      <MainNav />
      {/*<Main />*/}
      <NewMain />
      <Footer />
    </div>
  );
}

export default App;
