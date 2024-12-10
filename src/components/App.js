import React from 'react';
import { useState, useEffect } from 'react';
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

    const getCityName = async(lati, longi) => {
        const apiKey = "15ca5c63283b4e22adf1b819eee5d81d";
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lati}+${longi}&key=${apiKey}`;

        try{
            const response = await fetch(url);
            const data = await response.json();
            const city = data.results[0].components.city || data.results[0].components.town;
            console.log("City Name:", city);
            return city;
        }
        catch (error){
            console.error("Error fetching location name:", error);
            return null;
        }
    }

    const handleCurrentLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                async(position) => {
                    const {latitude, longitude} = position.coords;
                    const cityName = await getCityName(latitude, longitude);

                    if(cityName){
                        setWeather({...weather,loading:true});
                        const url = `${api.baseUrl}/current?query=${cityName}&key=${api.key}`;
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
                }
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
          const url = `${api.baseUrl}/current?query=Chennai&key=${api.key}`;
    
          try {
            const response = await axios.get(url);
            setWeather({ data: response.data, loading: false, error: false });
          } catch (error) {
            setWeather({ data: {}, loading: false, error: true });
            console.log("error", error);
          }
        };
    
        fetchData();
      }, []);
    return(
        <div className='App'>
            {/* Search component */}
            <SearchBar query={query} setQuery={setQuery} search={search} handleCurrentLocation={handleCurrentLocation}/>
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