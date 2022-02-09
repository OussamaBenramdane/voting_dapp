import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

function App() {
  // web3.setProvider('ws://localhost:8546');
  const web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
