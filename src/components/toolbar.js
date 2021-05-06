import React, { useState, useReducer } from 'react';
import hamburgericon from '../images/hamburger-icon.png';
import closeicon from '../images/close-icon.png';
import logo from '../images/logo.svg';
import Content from './ToolBarContent';

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
            <div id='ToolBarDay' >
                <div className="Menu-Button">
                    <img src={hamburgericon} className="Icon" alt="logo" onClick={() => dispatch({type: 'showOptions'})} />
                </div>
            </div>
        );
    } else if (state.showResults) {
        return (
            <div id='ToolBarDay' className={state.slide ? 'OpenToolBarDay' : null} >
                <div className="Menu-Button">
                    <img src={closeicon} className="Icon" alt="logo" onClick={() => dispatch({type: 'hideOptions'})} />
                </div>
                <br />
                <div>
                    <img src={logo} className="App-logo-ToolBar" alt="logo" />
                </div>
                <br />
                <Content popup={props.handleClose} />
            </div>
        );
    }
}

export default ToolBar;