import React, { useEffect, useState } from 'react';
import Clock from '../components/clock.js';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const WeatherHead = (props) => {

    var current = new Date();
    const [Sunrise, setSunrise] = useState("N/A");
    const [Sunset, setSunset] = useState("N/A");
    const [currSunrise, setcurrSunrise] = useState("N/A");
    const [WeatherData, setWeatherData] = useState("N/A");
    const source = "sg";
    const params = "waterTemperature,wavePeriod,waveDirection,waveHeight,windWaveDirection,windWaveHeight,windWavePeriod,swellPeriod,secondarySwellPeriod,swellDirection,secondarySwellDirection,swellHeight,secondarySwellHeight,windSpeed,windSpeed20m,windSpeed30m,windSpeed40m,windSpeed50m,windSpeed80m,windSpeed100m,windSpeed1000hpa,windSpeed800hpa,windSpeed500hpa,windSpeed200hpa,windDirection,windDirection20m,windDirection30m,windDirection40m,windDirection50m,windDirection80m,windDirection100m,windDirection1000hpa,windDirection800hpa,windDirection500hpa,windDirection200hpa,airTemperature,airTemperature80m,airTemperature100m,airTemperature1000hpa,airTemperature800hpa,airTemperature500hpa,airTemperature200hpa,precipitation,gust,cloudCover,humidity,pressure,visibility,currentSpeed,currentDirection,iceCover,snowDepth,seaLevel";

    var urlSunrise = `https://api.sunrise-sunset.org/json?lat=${props.Lat}&lng=${props.Long}&date=today&formatted=0`;
    var urlSunset = `https://api.sunrise-sunset.org/json?lat=${props.Lat}&lng=${props.Long}&date=yesterday&formatted=0`;
    var urlWeather = `https://api.stormglass.io/v2/weather/point?lat=${props.Lat}&lng=${props.Long}&params=${params}&source=${source}`;


    //Function to find data for the appropriate timings
    const arrayFinder = (value, index, array) => {
        if (!(value.time.substring(0, 13).localeCompare(current.toISOString().substring(0, 13)))) {
            return (array[index]);
        }
    }

    const findProp = (properties, prop) => {
        return properties.hasOwnProperty(prop) ? properties[prop].sg : 0;
    }


    const apiCaller = async () => {
        fetch(urlSunrise).then((response) => response.json()).then((jsonData) => {
            setSunrise(jsonData.results.sunrise.substring(0, 13));
        });

        fetch(urlSunset).then((response) => response.json()).then((jsonData) => {
            setSunset(jsonData.results.sunset.substring(0, 13));
            setcurrSunrise(jsonData.results.sunrise.substring(0, 13));
        });

        fetch(urlWeather, {
            headers: {
                'Authorization': '59a43f12-ac67-11eb-80d0-0242ac130002-59a43fbc-ac67-11eb-80d0-0242ac130002'
            }
        }).then((response) => response.json()).then((jsonData) => {
            setWeatherData(jsonData.hours.find(arrayFinder));
        });
    }

    useEffect(() => {
        if (props.Lat !== 0 && props.Long !== 0) {
            apiCaller();
        }
    }, [props.Lat, props.Long]);


    const DayOrNight = () => {
        if (current.toISOString().substring(0, 13) >= Sunset && current.toISOString().substring(0, 13) <= Sunrise) {
            return (true);
        } else if (current.toISOString().substring(0, 13) >= currSunrise && current.toISOString().substring(0, 13) < Sunset) {
            return (false);
        }
    }

    const picFinder = () => {
        if (findProp(WeatherData, "precipitation") >= 1.5 && DayOrNight()) {
            props.background(2);
            return (props.pics.NightRaining.image);
        } else if (findProp(WeatherData, "precipitation") >= 1.5 && !DayOrNight()) {
            props.background(7);
            return (props.pics.Raining.image);
        } else if (findProp(WeatherData, "cloudCover") >= 50 && DayOrNight()) {
            props.background(1);
            return (props.pics.NightCloudy.image);
        } else if (findProp(WeatherData, "cloudCover") >= 50 && !DayOrNight()) {
            props.background(6);
            return (props.pics.Cloudy.image);
        } else if (findProp(WeatherData, "snowDepth") > 0 && DayOrNight()) {
            props.background(3);
            return (props.pics.NightSnowing.image);
        } else if (findProp(WeatherData, "snowDepth") > 0 && !DayOrNight()) {
            props.background(8);
            return (props.pics.Snowing.image);
        } else if (findProp(WeatherData, "cloudCover") < 50 && !DayOrNight()) {
            props.background(4);
            return (props.pics.PartlyCloudy.image);
        } else if (findProp(WeatherData, "cloudCover") < 50 && DayOrNight()) {
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
                        {Math.ceil(findProp(WeatherData, "airTemperature"))} &#176;C
                    </h1>
                </div>
            </div>
            <Clock />
            <br />
            <Container>
                <Row>
                    <Col>
                        <h2>Cloud Cover</h2>
                        <p>{findProp(WeatherData, "cloudCover")} &#37;</p>
                    </Col>
                    <Col>
                        <h2>Gust</h2>
                        <p>{findProp(WeatherData, "gust")} m/s</p>
                    </Col>
                    <Col>
                        <h2>Visibility</h2>
                        <p>{findProp(WeatherData, "visibility")} km</p>
                    </Col>
                    <Col>
                        <h2>Pressure</h2>
                        <p>{findProp(WeatherData, "pressure")} hPa</p>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h2>Precipitation</h2>
                        <p>{findProp(WeatherData, "precipitation")} kg/m<sup>2</sup></p>
                    </Col>
                    <Col>
                        <h2>Wind Speed</h2>
                        <p>{findProp(WeatherData, "windSpeed")} m/s</p>
                    </Col>
                    <Col>
                        <h2>Humidity</h2>
                        <p>{findProp(WeatherData, "humidity")} &#37;</p>
                    </Col>
                    <Col>
                        <h2>Water Temperature</h2>
                        <p>{findProp(WeatherData, "waterTemperature")} &#176;C</p>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h2>Wind Direction</h2>
                        <p>{findProp(WeatherData, "windDirection")} &#176; (0&#176; is N)</p>
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