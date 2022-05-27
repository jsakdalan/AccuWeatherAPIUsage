import React, { useEffect, useState } from "react";
import {Container, Card} from 'react-bootstrap';
import './pageCss/WeatherReport.css';

export default function WeatherReport(){
    // GET CITY ID
    const [cityName, setCityName] = useState("Manila")
    const [city, setCity] = useState("Manila");
    const [tempCt, setTempCt] = useState("");
    const [weather, setWeather] = useState([]);
    const [day, setDay] = useState([false]);
    const [api, setApi] = useState("SKm912HePHAQlZhM2w2hh3k60sl6ubp8");

    
    const DataDisplay = () =>{
        return(  
            <>
                {
                    weather?.DailyForecasts?.map(data=>{   
                        const dateTime = new Date(data.Date);
                        let dateStr = dateTime.toString();
                        let trimDate = dateStr.substring(0, dateStr.length-50); 
                        let iconPhrase;
                        let iconId;
                        if(day){
                            iconId = data.Day.Icon;
                            iconPhrase = data.Day.IconPhrase;
                        }   
                        if(!day){
                            iconId = data.Night.Icon;
                            iconPhrase = data.Night.IconPhrase;
                        }
                        if(iconId < 10 ){
                            iconId = "0" + iconId;
                        }
                        let imgLink = `https://developer.accuweather.com/sites/default/files/${iconId}-s.png`;     
                        return(
                        <Card className={day?("weatherContainerLight"):("weatherContainer")}>
                            <Card.Text className="dateCss">
                            {trimDate}
                            </Card.Text>
                            <Card.Img className="weatherImage" variant="top" src={imgLink} />
                            <Card.Body>
                                <Card.Title className="cardTitle">{iconPhrase}</Card.Title>
                                <Card.Text className="cardText">
                                {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        )
                    }) 
                }   
            </>
        
        )
    }

    const FetchApi = (city) => {

        setCity(tempCt)
        let tempCityId; 

        const fetchData = async () => {
            const getCityUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
            const cityQuery = `?apikey=${api}&q=${city}`;
            
            const cityResponse = await fetch(getCityUrl + cityQuery);
            const cityData = await cityResponse.json();
            
            setCityName(cityData[0].LocalizedName);
            tempCityId = cityData[0].Key;

            const getWeatherUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
            const weatherQuery = `${tempCityId}?apikey=${api}`;

            const weatherResponse = await fetch(getWeatherUrl + weatherQuery);
            const weatherData = await weatherResponse.json();
            setWeather(weatherData);
        }      
        
        fetchData();
    }

    useEffect(() => {

        if(city){
            FetchApi(city);  
        }

    }, [city])  

    const ToggleMode = () =>{
        setDay(!day);
    }

    return(
        <>
            <Container>
                <div className="container" style ={day?({ backgroundImage: "url('https://www.teahub.io/photos/full/13-133890_firewatch-wallpaper-blue.jpg')" }):({backgroundImage: "url('https://wallpaper.dog/large/20493839.jpg')"}) }>
                    <div>
                        <div className="navContainer">
                            <h1 className="heading">Weather Forecast</h1>
                            <label className="labelCss">Enter your city:</label>
                            <input className="inputCss" placeholder="Manila" type='text' onChange={event => {setTempCt(event.target.value);}}/>
                            <button className="submit" onClick={() => FetchApi(city)}>Submit</button>
                        </div>
                        <h3>Welcome to the City of {cityName}</h3>
                        <div className="dayContainer">
                            <p className={day?("none"):("dayText")}>Switch to Day Time:</p>
                            <p className={!day?("none"):("nightText")}>Switch to Night Time:</p>
                            <label className="switch">
                                <input type="checkbox" onClick={ToggleMode}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="weatherOuterContainer">
                            <DataDisplay/> 
                        </div>
                    </div>
                </div>
                <div className="forApi">
                    <input type='text' onChange={event=>{setApi(event.target.value)}}></input>
                </div>
            </Container>
       </>
    )
}
