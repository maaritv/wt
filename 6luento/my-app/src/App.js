import logo from './logo.svg';
import './App.css';
import Image from "./Image";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Image src={logo}/>
        <p>
         täsä käytetään kuvakomponenttia. 
        </p>
      </header>
    </div>
  );
}

export default App;


