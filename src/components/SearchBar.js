import React from "react";

function SearchBar({query, setQuery, search, handleCurrentLocation}){
    //on presss query the data from openweather map org
    const handlePress = (e) =>{
        if(e.key === 'Enter'){
            search(e);
        }
    };
    return(
        <div className="SearchBar">
            <input
                type="text"
                className="city-search"
                placeholder="Enter your city name"
                name = "query"
                value = {query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handlePress}
            />
            <button onClick={search}><i className="fas fa-search" style={{ fontSize: "18px" }}></i></button>
            <button onClick={handleCurrentLocation} className="current-location-btn">
                <i className="fas fa-location-arrow" style={{ fontSize: "18px" }}></i>
            </button>
        </div>
    );
}

export default SearchBar;