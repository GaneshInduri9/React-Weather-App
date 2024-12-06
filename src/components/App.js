import React from 'react';

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
    return(
        <>
        </>
    );
}

export default App;