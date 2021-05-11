import React, { useState } from 'react';
import Clock from '../components/clock.js';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



//const json = require('../response.json');
const json = require('../testing.json');
var sunset = require('../Sunset.json');
var sunrise = require('../Sunrise.json');
var current = new Date();
console.log(new Date().toLocaleTimeString());
// Testing Environment °

//Function to find data for the appropriate timings
const arrayFinder = (value, index, array) => {
    if (!(value.time.substring(0, 13).localeCompare(current.toISOString().substring(0, 13)))) {
        return (array[index]);
    }
}
const WeatherData = json.hours.find(arrayFinder);

const DayOrNight = () => {
    if (current.toISOString().substring(0, 13) > sunset.results.sunset.substring(0, 13) && current.toISOString().substring(0, 13) < sunrise.results.sunrise.substring(0, 13)) {
        return(true);
    } else {
        return(false);
    }
}

//console.log(WeatherData);
/*
const tempFinder = (value, index, array) => {
    console.log(value.time);
    return !(value.time.substring(0, 13).localeCompare(current));
}*/

const WeatherHead = (props) => {

    const picFinder = () => {
        if (WeatherData.precipitation.sg > 50 && DayOrNight()) {
            return (props.pics.NightRaining.image);
        } else if (WeatherData.precipitation.sg > 50 && !DayOrNight()) {
            return (props.pics.Raining.image);
        } else if (WeatherData.cloudCover.sg > 0.5 && DayOrNight()) {
            return (props.pics.NightCloudy.image);
        } else if (WeatherData.cloudCover.sg > 0.5 && !DayOrNight()) {
            return (props.pics.Cloudy.image);
        }
    }

    return (
        <div className="Weather-overview">
            <div className="Weather-top">
                <div className="WeatherApp-pic">
                    <img src={picFinder()} className="WeatherApp-icon" alt="WeatherApp-icon" />
                </div>
                <div className="Temperature">
                    <h1>
                        {Math.round(WeatherData.airTemperature.sg)} &#176;C
                    </h1>
                </div>
            </div>
            <Clock />
            <br />
            <Container>
                <Row>
                    <Col>
                        <h2>Cloud Cover</h2>
                        <p>{WeatherData.cloudCover.sg} &#37;</p>
                    </Col>
                    <Col>
                        <h2>Gust</h2>
                        <p>{WeatherData.gust.sg} m/s</p>
                    </Col>
                    <Col>
                        <h2>Visibility</h2>
                        <p>{WeatherData.visibility.sg} km</p>
                    </Col>
                    <Col>
                        <h2>Pressure</h2>
                        <p>{WeatherData.pressure.sg} hPa</p>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h2>Precipitation</h2>
                        <p>{WeatherData.precipitation.sg} kg/m<sup>2</sup></p>
                    </Col>
                    <Col>
                        <h2>WindSpeed</h2>
                        <p>{WeatherData.windSpeed.sg} m/s</p>
                    </Col>
                    <Col>
                        <h2>Humidity</h2>
                        <p>{WeatherData.humidity.sg} &#37;</p>
                    </Col>
                    <Col>
                        <h2>WaterTemperature</h2>
                        <p>{WeatherData.waterTemperature.sg} &#176;C</p>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h2>WindDirection</h2>
                        <p>{WeatherData.windDirection.sg} &#176; (0&#176; is N)</p>
                    </Col>
                    <Col>
                        <h2>SnowDepth</h2>
                        {/*<p>{WeatherData.snowDepth.sg} m</p>*/}
                    </Col>
                    <Col>
                        <h2>IceCover</h2>
                        {/*<p>{WeatherData.iceCover.sg}</p>*/}
                    </Col>
                    <Col>
                        <h2>SeaLevel</h2>
                        {/*<p>{WeatherData.seaLevel.sg} MSL</p>*/}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default WeatherHead;