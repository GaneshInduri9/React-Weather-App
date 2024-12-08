import axios from "axios";
import { useEffect } from "react";

function Forecast({weather}){

    const {data} = weather;
    const api = {
        key : "b03a640e5ef6980o4da35b006t5f2942",
        baseUrl : "https://api.shecodes.io/weather/v1/"
    };

    useEffect( () => {
        const fetchForcastData = async() =>{
            const url = `${api.baseUrl}forecast?query=${data.city}&key=${api.key}&units=metric`;

            await axios
                .get(url)
                .then((res) => {
                    console.log("Retrived forcast information" + res);
                })
                .catch((error) => {
                    console.log("unable to retrive the data "+ error);
                });
        }

        fetchForcastData();
    }, [data.city]);


}

export default Forecast;