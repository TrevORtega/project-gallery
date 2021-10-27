import logo from './logo.svg';
import './App.css';
import Nav from './nav.js';

//<img src={logo} className="App-logo" alt="logo" />

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <h3>
          Find Projects from Developers around the World! 
        </h3>
      </header>
    </div>
  );
}

export default App;
