import React, { useState } from 'react';
import logo from './images/logo.svg';
import './App.css';
import WeatherPage from './components/weather-data.js';
import ToolBar from './components/toolbar.js';
import About from './components/about.js';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const changeMode = () => {
    setMode(!mode);
  }

  const props = {
    handleClose: togglePopup,
    handleMode: changeMode,
    modeType: mode
    }

  return (
    <div className="App">
      <ToolBar {...props}/>
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
        <WeatherPage />
        {isOpen && <About handleClose={togglePopup} modeSet={mode ? "ToolBarNight" : null }/>}
      </header>
    </div>
  );
}

export default App;
