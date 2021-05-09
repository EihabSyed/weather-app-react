import React, { useState } from 'react';
import logo from './images/logo.svg';
import './App.css';
import WeatherPage from './components/weather-data.js';
import ToolBar from './components/toolbar.js';
import About from './components/about.js';
import { useCookies } from 'react-cookie';

function App() {

  var userLongitude;
  var userLatitude;
  const showPosition = async () => {
    navigator.geolocation.getCurrentPosition(await function (position) {
      //console.log(position.coords.latitude);
      //console.log(position.coords.longitude);
      userLongitude = position.coords.longitude;
      userLatitude = position.coords.latitude;
      console.log(userLongitude);
      console.log(userLatitude);
    })
  }




  React.useEffect(showPosition);

  const [isOpen, setIsOpen] = useState(false);
  const [opacAll, setOpacAll] = useState(false);
  //const [mode, setMode] = useState(false);
  //var localIsTrueSet = (localStorage.getItem("Mode") === 'true');
  const [cookies, setCookie] = useCookies(['Mode']);
  var cookiesIsTrueSet = (cookies.Mode === 'true');

  if (cookies.Mode === undefined) {
    setCookie('Mode', false, { path: '/' });
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const toggleOpac = () => {
    setOpacAll(!opacAll);
  }

  const changeMode = () => {
    setCookie('Mode', !cookiesIsTrueSet, { path: '/' });
    cookiesIsTrueSet = (cookies.Mode === 'true');
    //setMode(!mode);
    //localStorage.setItem("Mode", !localIsTrueSet);
    //localIsTrueSet = (localStorage.getItem("Mode") === 'true');
  }

  const props = {
    handleClose: togglePopup,
    handleMode: changeMode,
    //modeType: mode,
    cookieMode: cookiesIsTrueSet,
    //storageMode: localIsTrueSet
    allOpac: toggleOpac
  }

  return (
    <div className="App">
      <ToolBar {...props} />
      <header className="App-header">
        <div className={opacAll ? "Weather-page-open" : "Weather-page-close"}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <p>{userLongitude}</p>
          <p>{userLatitude}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
          <WeatherPage />
        </div>
        {isOpen && <About {...props} />}
      </header>
    </div>
  );
}

export default App;
