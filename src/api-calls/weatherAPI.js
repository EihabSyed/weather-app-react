import React, { useState } from 'react';
import Clock from '../components/clock.js';
import { Grid } from '@material-ui/core';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



//const json = require('../response.json');
const json = require('../testing.json');
var current = new Date().toISOString().substring(0, 13);
// Testing Environment °

//Function to find data for the appropriate timings
const arrayFinder = (value, index, array) => {
    if (!(value.time.substring(0, 13).localeCompare(current))) {
        return (array[index]);
    }
}
const WeatherData = json.hours.find(arrayFinder);

//console.log(json.hours);
console.log(WeatherData);
/*
const tempFinder = (value, index, array) => {
    console.log(value.time);
    return !(value.time.substring(0, 13).localeCompare(current));
}*/

const WeatherHead = (props) => {

    return (
        <div className="Weather-overview">
            <div className="Weather-top">
                <div className="WeatherApp-pic">
                    <img src={props.pic} className="WeatherApp-icon" alt="WeatherApp-icon" />
                </div>
                <div className="Temperature">
                    <h1>
                        {Math.round(WeatherData.airTemperature.sg)}&#176;C
                    </h1>
                </div>
            </div>
            <Clock />
            <br/>
            <br/>
            <Container>
                <Row>
                    <Col>
                        <h2>Cloud Cover</h2>
                        <p>{WeatherData.cloudCover.sg}&#37;</p>
                    </Col>
                    <Col>
                        <h2>Gust</h2>
                        <p>{WeatherData.gust.sg}&#37;</p>
                    </Col>
                    <Col>
                        <h2>Visibility</h2>
                        <p>{WeatherData.visibility.sg}&#37;</p>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col>
                        <h2>Precipitation</h2>
                        <p>{WeatherData.precipitation.sg}&#37;</p>
                    </Col>
                    <Col>
                        <h2>WindSpeed</h2>
                        <p>{WeatherData.windSpeed.sg}&#37;</p>
                    </Col>
                    <Col>
                        <h2>Humidity</h2>
                        <p>{WeatherData.humidity.sg}&#37;</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default WeatherHead;