import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import closeicon from '../images/close-icon.png';
import github from '../images/github-icon.png';
import linkedIn from '../images/linkedin-icon.svg';
var classNames = require('classnames');

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #d669f1 30%, #8421f3 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 60,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        margin: 10
    }
});

const About = (props) => {

    const classes = useStyles();

    var themeClass = classNames({
        'box': true,
        'ToolBarNight': false
    });
    if (/*props.storageMode*/ props.cookieMode) {
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
                    <p>My Github is down below</p>
                </div>
                <div>
                    <Button classes={{root: classes.root}} size="large" className="button" variant="contained" onClick={() => window.open("https://github.com/")} color="primary">
                        <img src={github} className="brand" alt="github" />
                    </Button>
                    <Button classes={{root: classes.root}} size="large" className="button" variant="contained" onClick={() => window.open("https://ca.linkedin.com/")} color="primary">
                        <img src={linkedIn} className="brand" alt="linkedIn" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default About;