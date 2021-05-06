import React from 'react';
import { Button } from '@material-ui/core';
import closeicon from '../images/close-icon.png';
import github from '../images/github-icon.png';

const About = (props) => {

    return (
        <div className="popup-box">
            <div className="box">
                <div>
                    <img src={closeicon} className="Icon" onClick={props.handleClose} />
                </div>
                <br />
                <div className="popup-content">
                    <br />
                    <h1>About Me</h1>
                    <p>My git hub is down below</p>
                </div>
                <Button size="large" className="button" variant="outlined" onClick={() => window.open("https://github.com/")} >
                    <img src={github} className="brand" alt="github" />
                </Button>
            </div>
        </div>
    );
}

export default About;