import React from 'react';

// Testing Environment °
const json = require('../response.json');
const lat = 43.961775;
const lng = -78.894863;
const params = 'airTemperature';
const source = 'sg';
var current = new Date().toISOString().substring(0, 13);

const tempFinder = (value, index, array) => {
    return !(value.time.substring(0, 13).localeCompare(current));
}

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
        <div>
            <p>{Math.round(json.hours.find(tempFinder).airTemperature.sg)}&#176;C</p>
            <p>{lat}</p>
            <p>{lng}</p>
        </div>
    );
}

export default WeatherPage;