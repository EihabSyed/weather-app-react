import React, { useState, useEffect } from 'react';
const request = require('request');


const LocationHeader = (props) => {

    //const lat = 43.961775;
    //const lng = -78.894863;
    var urlPlace = `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.Long},${props.Lat}.json?access_token=pk.eyJ1IjoiZWloYWJzeWVkIiwiYSI6ImNrb2htdjZyMjB5MGwydW9kcGhrdng3cmYifQ.mbYuzglXqH7jgVN54UpVOg`;

    const [location, setLocation] = useState("N/A");

    /*var options = {
        'method': 'GET',
        'url': urlPlace
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(JSON.parse(response.body).features[3].place_name);
    });

    const placeFinder = () => {
        return (place.features[3].place_name);
    }*/

    const apiCaller = async () => {
        fetch(urlPlace).then((response) => response.json()).then((jsonData) => {
        setLocation(jsonData.features[3].place_name);
        });
    }

    useEffect(() => {
        if (props.Lat !== 0 && props.Long !== 0) {
            apiCaller();
        }
    }, [props.Lat, props.Long]);

    return (
        <div>
            {location}
        </div>
    );
}

export default LocationHeader;