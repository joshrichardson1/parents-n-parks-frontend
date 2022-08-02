import './Weather.css';
import React, {useState, useEffect, useMemo} from 'react';
import {getUserProfile, fetchWeather } from '../../api/backendAPI';

// const api = {
//     key : "1b801810edf2f965e69f04b8e2c365a4",
//     base : "https://api.openweathermap.org/data/2.5/"
// }

export const Weather = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState(false);
    // const zipcode = "60142";
    
  
    useEffect(() => {
        const getWeather = async () => {
            const profileData = await getUserProfile(localStorage.getItem('accessToken')).then(data => { return data })
            let response = await fetchWeather(profileData[0].zip_code);
            // let response = await fetch(`${api.base}weather?zip=${profileData[0].zip_code},us&APPID=${api.key}`);  // will need to change 60142 to ${zip code} and will need to pull that from profile
            // let data = await response.json();
            // console.log(data);
            if (response) {
                setWeather(response);
            }
        }
        getWeather();        
    }, []);
    
        
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${date} ${month}, ${year}`;
    };

    const renderWeather = () => {
        if (!weather){
            return <div>Loading...</div>
        }
        return (
            <div>
                <div className="location-box">
                    <div className="location" id='weatherLocation'>{weather.name}</div>
                    <div className="date">
                        {dateBuilder(new Date())}
                    </div>
                </div>
                <div className="weather-info">
                    <div className='temp'>
                        Real Temp: {Math.round(weather.main.temp * (9/5) - 459.67)}°F <br />
                        Feels Like: {Math.round(weather.main.feels_like * (9/5) - 459.67)}°F
                    </div>
                <div className='weather-desc'>
                    The weather today is {weather.weather[0].description}
                </div>
                </div>
            </div>
            
        )
    }

    return (
        <div className='weather' id="weatherContainer">
            {renderWeather()}
        </div>
    )
}