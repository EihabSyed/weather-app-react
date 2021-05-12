import React, { useState } from 'react';
import './App.css';
import WeatherPage from './components/weather-data.js';
import ToolBar from './components/toolbar.js';
import About from './components/about.js';
import { useCookies } from 'react-cookie';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [picBackground, setPicBackground] = useState(1);
  const [cookies, setCookie] = useCookies(['Mode']);
  var cookiesIsTrueSet = (cookies.Mode === 'true');

  if (cookies.Mode === undefined) {
    setCookie('Mode', false, { path: '/' });
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const changeMode = () => {
    setCookie('Mode', !cookiesIsTrueSet, { path: '/' });
    cookiesIsTrueSet = (cookies.Mode === 'true');
  }

  const props = {
    handleClose: togglePopup,
    handleMode: changeMode,
    cookieMode: cookiesIsTrueSet,
  }

  const backgroundSetter = () => {
    if (picBackground === 1) {
      return "Day-Cloudy";
    } else if (picBackground === 2) {
      return "Day-Raining";
    } else if (picBackground === 3) {
      return "Day-Snowing";
    } else if (picBackground === 4) {
      return "Sunny";
    } else if (picBackground === 5) {
      return "Night";
    } else if (picBackground === 6) {
      return "Night-Cloudy";
    } else if (picBackground === 7) {
      return "Night-Raining";
    } else if (picBackground === 8) {
      return "Night-Snowing";
    } 
  }

  return (
    <div className={backgroundSetter()}>
      <ToolBar {...props} />
      <header className="App-header">
        <WeatherPage background={setPicBackground}/>
      </header>
      {isOpen && <About {...props} />}
    </div>
  );
}

export default App;
