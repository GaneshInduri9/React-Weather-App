import React from 'react';
import { useState } from 'react';
import SearchBar from './SearchBar';
import axios from "axios";
function App(){

    const api = {
        key : "99ac3aa24a59530635b65e55b3c2c365",
        baseUrl : "https://api.openweathermap.org/data/2.5/"
    };

    const toDate = () => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
        }`;
        return date;
    };

    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({
        loading : false,
        data : {},
        error : false
    });

    const search = async(event) => {
        event.preventDefault();
        if (event.type == "click" || (event.type == "keypress" && event.key == "Enter")){
            setWeather({...weather,loading:true});
            const url = `${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`;

            await axios
                .get(url)
                .then((res) => {
                    console.log("Fetched the data from api " + JSON.stringify(res.data, null, 2));
                    setWeather({loading:false, data: res.data, error: false});
                })
                .catch((error)=>{
                    console.log("Error : unable to fetch the data "+ error);
                    setWeather({...weather,data:{},error:true});
                });
        }
    };
    return(
        <div className='App'>
            {/* Search component */}
            <SearchBar query={query} setQuery={setQuery} search={search}/>
            {weather.loading && (
                <>
                    <br />
                    <br />
                    <h4>Searching..</h4>
                </>
            )}
        </div>
    );
}

export default App;