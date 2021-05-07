import React, { useReducer } from 'react';
import hamburgericon from '../images/hamburger-icon.png';
import closeicon from '../images/close-icon.png';
import logo from '../images/logo.svg';
import Content from './ToolBarContent';
var classNames = require('classnames');

const ToolBar = (props) => {

    const initialState = {
        showResults: false,
        slide: false
    };

    function reducer(prevState, action) {
        switch (action.type) {
            case 'showOptions':
                return {...prevState,
                    showResults: true,
                    slide: true
                };
            case 'hideOptions':
                return {...prevState,
                    showResults: false,
                    slide: false
                };
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    if (!state.showResults) {
        return (
            <div id='ToolBarDay' className={props.modeType ? "ToolBarNight" : null}>
                <div className="Menu-Button">
                    <img src={hamburgericon} className="Icon" alt="hamburgericon" onClick={() => dispatch({type: 'showOptions'})} />
                </div>
            </div>
        );
    } else if (state.showResults) {
        var themeClass = classNames({
            'OpenToolBarDay': true,
            'darkTheme': false
          });
        if (props.modeType) {
            themeClass = classNames({
                'OpenToolBarDay': true,
                'darkTheme': true
              });
        }
        return (
            <div id='ToolBarDay' className={themeClass} >
                <div className="Menu-Button">
                    <img src={closeicon} className="Icon" alt="closeicon" onClick={() => dispatch({type: 'hideOptions'})} />
                </div>
                <br />
                <div>
                    <img src={logo} className="App-logo-ToolBar" alt="logo" />
                </div>
                <br />
                <Content {...props} />
            </div>
        );
    }
}

export default ToolBar;