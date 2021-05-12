import React, { useState } from 'react';
import WeatherHead from '../api-calls/weatherAPI.js';
import cloudyImage from '../images/background-images/Cloudy.png';
import raingingImage from '../images/background-images/Raining.png';
import snowingImage from '../images/background-images/Snowing.jpg';
import partlyCloudyImage from '../images/background-images/Partly-Cloudy.png';
import nightImage from '../images/background-images/Night.png';
import nightCloudyImage from '../images/background-images/Night-Cloudy.png';
import nightRainingImage from '../images/background-images/Night-Raining.png';
import snowingNightImage from '../images/background-images/Snowing-Night.png';
import LocationHeader from '../api-calls/locationAPI.js';


const pictures = {
    "Cloudy": { image: cloudyImage, id: 1 },
    "Raining": { image: raingingImage, id: 2 },
    "Snowing": { image: snowingImage, id: 3 },
    "PartlyCloudy": { image: partlyCloudyImage, id: 4 },
    "Night": { image: nightImage, id: 5 },
    "NightCloudy": { image: nightCloudyImage, id: 6 },
    "NightRaining": { image: nightRainingImage, id: 7 },
    "NightSnowing": { image: snowingNightImage, id: 8 }
};

const WeatherPage = (props) => {

    const [userLatitude, setUserLatitude] = useState(0);
    const [userLongitude, setUserLongitude] = useState(0);
    const showPosition = () => {
        navigator.geolocation.getCurrentPosition(async function (position) {
            const userLongitude = position.coords.longitude;
            const userLatitude = position.coords.latitude;
            getLocation(userLatitude, userLongitude);
        })
    }

    React.useEffect(showPosition, []);


    const getLocation = (lat, long) => {
        setUserLatitude(lat);
        setUserLongitude(long);
    }

    return (
        <div className="Weather-header">
            <div className="Location">
                <LocationHeader Lat={userLatitude} Long={userLongitude}/>
            </div>
            <WeatherHead pics={pictures} Lat={userLatitude} Long={userLongitude} background={props.background}/>
        </div>
    );
}

export default WeatherPage;







/*
waterTemperature,wavePeriod,waveDirection,waveHeight,windWaveDirection,windWaveHeight,windWavePeriod,swellPeriod,secondarySwellPeriod,swellDirection,secondarySwellDirection,swellHeight,secondarySwellHeight,windSpeed,windSpeed20m,windSpeed30m,windSpeed40m,windSpeed50m,windSpeed80m,windSpeed100m,windSpeed1000hpa,windSpeed800hpa,windSpeed500hpa,windSpeed200hpa,windDirection,windDirection20m,windDirection30m,windDirection40m,windDirection50m,windDirection80m,windDirection100m,windDirection1000hpa,windDirection800hpa,windDirection500hpa,windDirection200hpa,airTemperature,airTemperature80m,airTemperature100m,airTemperature1000hpa,airTemperature800hpa,airTemperature500hpa,airTemperature200hpa,precipitation,gust,cloudCover,humidity,pressure,visibility,currentSpeed,currentDirection,iceCover,snowDepth,seaLevel
*/