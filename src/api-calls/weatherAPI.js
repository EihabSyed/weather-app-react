import React, { useEffect, useState } from 'react';
import Clock from '../components/clock.js';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const json = require('../response.json');
var current = new Date();
//console.log(new Date().toLocaleTimeString());
// Testing Environment °

//Function to find data for the appropriate timings
const arrayFinder = (value, index, array) => {
    if (!(value.time.substring(0, 13).localeCompare(current.toISOString().substring(0, 13)))) {
        return (array[index]);
    }
}
const WeatherData = json.hours.find(arrayFinder);


const findProp = (properties, prop) => {
    return properties.hasOwnProperty(prop) ? properties[prop].sg : 0;
}

const WeatherHead = (props) => {

    const [Sunrise, setSunrise] = useState("N/A");
    const [Sunset, setSunset] = useState("N/A");
    const [currSunrise, setcurrSunrise] = useState("N/A");

    var urlSunrise = `https://api.sunrise-sunset.org/json?lat=${props.Lat}&lng=${props.Long}&date=today&formatted=0`;
    var urlSunset = `https://api.sunrise-sunset.org/json?lat=${props.Lat}&lng=${props.Long}&date=yesterday&formatted=0`;


    const apiCaller = async () => {
        fetch(urlSunrise).then((response) => response.json()).then((jsonData) => {
            setSunrise(jsonData.results.sunrise.substring(0, 13));
        });

        fetch(urlSunset).then((response) => response.json()).then((jsonData) => {
            setSunset(jsonData.results.sunset.substring(0, 13));
            setcurrSunrise(jsonData.results.sunrise.substring(0, 13));
        });
    }

    useEffect(() => {if (props.Lat !== 0 && props.Long !== 0) {
        apiCaller();
    }}, [props.Lat, props.Long]);


    const DayOrNight = () => {
        if (current.toISOString().substring(0, 13) >= Sunset && current.toISOString().substring(0, 13) <= Sunrise) {
            return (true);
        } else if (current.toISOString().substring(0, 13) >= currSunrise && current.toISOString().substring(0, 13) < Sunset) {
            return (false);
        }
    }
    console.log(Sunset);
    console.log(Sunrise);
    console.log(currSunrise);
    console.log(current.toISOString().substring(0, 13));

    const picFinder = () => {
        if (WeatherData.precipitation.sg >= 1.5 && DayOrNight()) {
            props.background(2);
            return (props.pics.NightRaining.image);
        } else if (WeatherData.precipitation.sg >= 1.5 && !DayOrNight()) {
            props.background(7);
            return (props.pics.Raining.image);
        } else if (WeatherData.cloudCover.sg >= 50 && DayOrNight()) {
            props.background(1);
            return (props.pics.NightCloudy.image);
        } else if (WeatherData.cloudCover.sg >= 50 && !DayOrNight()) {
            props.background(6);
            return (props.pics.Cloudy.image);
        } else if (findProp(WeatherData, "snowDepth") > 0 && DayOrNight()) {
            props.background(3);
            return (props.pics.NightSnowing.image);
        } else if (findProp(WeatherData, "snowDepth") > 0 && !DayOrNight()) {
            props.background(8);
            return (props.pics.Snowing.image);
        } else if (WeatherData.cloudCover.sg < 50 && !DayOrNight()) {
            props.background(4);
            return (props.pics.PartlyCloudy.image);
        } else if (WeatherData.cloudCover.sg < 50 && DayOrNight()) {
            props.background(5);
            return (props.pics.Night.image);
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
                        {Math.ceil(WeatherData.airTemperature.sg)} &#176;C
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
                        <h2>Wind Speed</h2>
                        <p>{WeatherData.windSpeed.sg} m/s</p>
                    </Col>
                    <Col>
                        <h2>Humidity</h2>
                        <p>{WeatherData.humidity.sg} &#37;</p>
                    </Col>
                    <Col>
                        <h2>Water Temperature</h2>
                        <p>{WeatherData.waterTemperature.sg} &#176;C</p>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h2>Wind Direction</h2>
                        <p>{WeatherData.windDirection.sg} &#176; (0&#176; is N)</p>
                    </Col>
                    <Col>
                        <h2>Snow Depth</h2>
                        <p>{findProp(WeatherData, "snowDepth")} m</p>
                    </Col>
                    <Col>
                        <h2>Ice Cover</h2>
                        <p>{findProp(WeatherData, "iceCover")}</p>
                    </Col>
                    <Col>
                        <h2>Sea Level</h2>
                        <p>{findProp(WeatherData, "seaLevel")} MSL</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default WeatherHead;