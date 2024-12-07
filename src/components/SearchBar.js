import React from "react";

function SearchBar({query, setQuery, search}){
    //on presss query the data from openweather map org
    const handlePress = (e) =>{
        if(e.key === "Enter"){
            search(e);
        }
    };
    return(
        <div className="SeachBar">
            <input
                type="text"
                className="city-search"
                placeholder="Search...."
                name = "query"
                value = {query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handlePress}
            />
            <button onClick={search}><i className="fas fa-search" style={{ fontSize: "18px" }}></i></button>
        </div>
    );
}

export default SearchBar;