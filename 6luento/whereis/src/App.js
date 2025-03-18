import './App.css';
import WhereIsList from "./WhereIsList"

function App() {

 const  items = ["eka", "toka"]
 const whereIsHeader="My WhereIs Items"

  return (
    <div className="App">
    <WhereIsList header={whereIsHeader} items={items}/>
    </div>
  );
}

export default App;
