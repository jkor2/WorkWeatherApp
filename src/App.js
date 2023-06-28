import logo from "./logo.svg";
import "./App.css";
import Functionality from "./comp/dash";

function App() {
  return (
    <div className="App">
      <header className="white-text">
        <h1>PG Weather</h1>
      </header>
      <body>
        <Functionality />
      </body>
    </div>
  );
}

export default App;
