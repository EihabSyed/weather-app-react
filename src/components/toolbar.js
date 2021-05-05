import React, { useState } from 'react';
import hamburgericon from '../images/hamburger-icon.png';
import closeicon from '../images/close-icon.png';
import logo from '../images/logo.svg';

const ToolBar = () => {

    const [showResults, setShowResults] = useState(false);
    const [slide, setSlide] = useState(false);
    const showOptions = () => {
        setShowResults(true);
        setSlide(true);
    }
    const hideOptions = () => {
        setShowResults(false);
        setSlide(false);
    }
    if (!showResults) {
        return (
            <div id='ToolBarDay' >
                <div className="Menu-Button">
                    <img src={hamburgericon} className="Icon" alt="logo" onClick={showOptions} />
                </div>
            </div>
        );
    } else if (showResults) {
        return (
            <div id='ToolBarDay' className={slide ? 'OpenToolBarDay' : null} >
                <div className="Menu-Button">
                    <img src={closeicon} className="Icon" alt="logo" onClick={hideOptions}/>
                </div>
                <br/>
                <div>
                    <img src={logo} className="App-logo-ToolBar" alt="logo" />
                </div>
                <br/>
                <div className="Information">
                    <h3>Day/Night Mode</h3>
                    <h3>Contact</h3>
                </div>
            </div>
        );
    }
}

export default ToolBar;