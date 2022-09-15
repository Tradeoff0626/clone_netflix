import logo from './logo.svg';
import './App.css';

function App() {
  //react에서 환경변수 사용 시, 반드시 'REACT_APP_'으로 시작해야 한다.
  const MOVIEDB_API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
