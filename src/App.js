import React, { useState } from 'react';
import './App.css';
import WeatherPage from './components/weather-data.js';
import ToolBar from './components/toolbar.js';
import About from './components/about.js';
import { useCookies } from 'react-cookie';

function App() {

  const showPosition = () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      //console.log(position.coords.latitude);
      //console.log(position.coords.longitude);
      const userLongitude = position.coords.longitude;
      const userLatitude = position.coords.latitude;
      getLocation(userLatitude, userLongitude);
    })
  }

  React.useEffect(showPosition, []);


  const getLocation = (lat, long) => {
    console.log(lat);
    console.log(long);
  }


  const [isOpen, setIsOpen] = useState(false);
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
    //allOpac: toggleOpac
  }

  return (
    <div className="App">
      <ToolBar {...props} />
      <header className="App-header">
        {/*<div className={opacAll ? "Weather-page-open" : "Weather-page-close"}></div>*/}
        <WeatherPage />
      </header>
      {isOpen && <About {...props} />}
    </div>
  );
}

export default App;
