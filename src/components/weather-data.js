import React, { useState } from 'react';
import WeatherHead from '../api-calls/weatherAPI.js';
import cloudyImage from '../images/background-images/Cloudy.png';
import raingingImage from '../images/background-images/Raining.png';
import snowingImage from '../images/background-images/Snowing.png';

var place = require('../newResponse.json');
//var request = require('request');
//const lat = 43.961775;
//const lng = -78.894863;
const lat = 49.611622;
const lng = 6.131935;
const params = 'airTemperature';
const source = 'sg';
/*var urlPlace = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiZWloYWJzeWVkIiwiYSI6ImNrb2htdjZyMjB5MGwydW9kcGhrdng3cmYifQ.mbYuzglXqH7jgVN54UpVOg`;

var options = {
    'method': 'GET',
    'url': urlPlace
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    place = JSON.parse(response.body).features[3].place_name;
    console.log(JSON.parse(response.body).features[3].place_name);
});*/

const placeFinder = () => {
    return (place.features[3].place_name);
}


const pictures = [{ name: "Cloudy", image: cloudyImage, id: 1 },
{ name: "Raining", image: raingingImage, id: 2 },
{ name: "Snowing", image: snowingImage, id: 3 }];


const WeatherPage = () => {
    /*fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&source=${source}`, {
        headers: {
            'Authorization': '59a43f12-ac67-11eb-80d0-0242ac130002-59a43fbc-ac67-11eb-80d0-0242ac130002'
        }
    }).then((response) => response.json()).then((jsonData) => {
        // Do something with response data.
        return (<p>{Math.ceil(jsonData.hours.find(tempFinder).airTemperature.sg)}</p>);
    });*/
    return (
        <div className="Weather-header">
            <div className="Location">
                {placeFinder()}
            </div>
            <WeatherHead pic={raingingImage} />
        </div>
    );
}

export default WeatherPage;







/*
waterTemperature,wavePeriod,waveDirection,waveHeight,windWaveDirection,windWaveHeight,windWavePeriod,swellPeriod,secondarySwellPeriod,swellDirection,secondarySwellDirection,swellHeight,secondarySwellHeight,windSpeed,windSpeed20m,windSpeed30m,windSpeed40m,windSpeed50m,windSpeed80m,windSpeed100m,windSpeed1000hpa,windSpeed800hpa,windSpeed500hpa,windSpeed200hpa,windDirection,windDirection20m,windDirection30m,windDirection40m,windDirection50m,windDirection80m,windDirection100m,windDirection1000hpa,windDirection800hpa,windDirection500hpa,windDirection200hpa,airTemperature,airTemperature80m,airTemperature100m,airTemperature1000hpa,airTemperature800hpa,airTemperature500hpa,airTemperature200hpa,precipitation,gust,cloudCover,humidity,pressure,visibility,currentSpeed,currentDirection,iceCover,snowDepth,seaLevel
*/