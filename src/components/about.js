import React from 'react';
import { Button } from '@material-ui/core';
import closeicon from '../images/close-icon.png';
import github from '../images/github-icon.png';
var classNames = require('classnames');

const About = (props) => {

    var themeClass = classNames({
        'box': true,
        'ToolBarNight': false
    });
    if (props.modeSet) {
        themeClass = classNames({
            'box': true,
            'ToolBarNight': true
        });
    }
    return (
        <div className="popup-box">
            <div className={themeClass}>
                <div>
                    <img src={closeicon} className="Icon" onClick={props.handleClose} alt="closeicon" />
                </div>
                <br />
                <div className="popup-content">
                    <br />
                    <h1>About Me</h1>
                    <p>My git hub is down below</p>
                </div>
                <Button size="large" className="button" variant="contained" onClick={() => window.open("https://github.com/")} color="primary">
                    <img src={github} className="brand" alt="github" />
                </Button>
            </div>
        </div>
    );
}

export default About;