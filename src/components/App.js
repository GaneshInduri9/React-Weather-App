import React from 'react';
import { useState } from 'react';
import SearchBar from './SearchBar';
import Forecast from './Forecast';
import axios from "axios";
import '../index';
import '@fortawesome/fontawesome-free/css/all.min.css';
function App(){

    const api = {
        key : "b03a640e5ef6980o4da35b006t5f2942",
        baseUrl : "https://api.shecodes.io/weather/v1/"
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
            const url = `${api.baseUrl}/current?query=${query}&key=${api.key}`;

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

            {weather.error && (
                <>
                    <br />
                    <br />
                    <span className="error-message">
                        <span style={{ fontFamily: "font" }}>
                            Sorry city not found, please try again.
                        </span>
                    </span>
                </>
            ) }

            {weather && weather.data && weather.data.condition && (
                <Forecast weather={weather}/> 
            )}
        </div>
    );
}

export default App;