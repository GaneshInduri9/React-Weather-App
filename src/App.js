import React from "react";
function App() {
  const api = {
    key : "",
    baseUrl : "https://api.openweathermap.org/data/2.5/"
  }
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
        </div>
      </main>
    </div>
  );
}

export default App;
