import React, { useEffect, useState } from "react";
import {Container, Card} from 'react-bootstrap';
import './pageCss/WeatherReport.css';

export default function WeatherReport(){

    const apikey = 'SKm912HePHAQlZhM2w2hh3k60sl6ubp8';

    // GET CITY ID
    const [cityName, setCityName] = useState("Manila")
    const [city, setCity] = useState("Manila");
    const [tempCt, setTempCt] = useState("");
    const [weather, setWeather] = useState([]);
    const [day, setDay] = useState([false]);

    const FetchApi = (city) => {

        setCity(tempCt)
        let tempCityId; 

        const fetchData = async () => {
            const getCityUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
            const cityQuery = `?apikey=${apikey}&q=${city}`;
            
            const cityResponse = await fetch(getCityUrl + cityQuery);
            const cityData = await cityResponse.json();
            setCityName(cityData[0].LocalizedName);
            tempCityId = cityData[0].Key;

            const getWeatherUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
            const weatherQuery = `${tempCityId}?apikey=${apikey}`;

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
                        <div>
                            {
                                day?(
                                    <div className="weatherOuterContainer">
                                    {   
                                        weather?.DailyForecasts?.map(data => {
                                            const dateTime = new Date(data.Date);
                                            let dateStr = dateTime.toString();
                                            let trimDate = dateStr.substring(0, dateStr.length-50);
                                            if(data.Day.IconPhrase === "Sunny"){
                                                return(                                            
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/01-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                )
                                            }
                                            if(data.Day.IconPhrase === "Mostly sunny"){
                                                return(                                            
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/02-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                )
                                            }
                                            if(data.Day.IconPhrase === "Partly sunny"){
                                                return(                                            
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/03-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                )
                                            }
                                            if(data.Day.IconPhrase === "Intermittent clouds"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/04-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                )
                                            }
                                            if(data.Day.IconPhrase === "Hazy sunshine"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/05-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Mostly cloudy"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/06-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                )
                                            }
                                            if(data.Day.IconPhrase === "Cloudy"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/07-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Dreary (overcast)"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/08-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Fog"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/11-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Showers"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/12-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Mostly cloudy w/ showers"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/13-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Partly sunny w/ showers"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/14-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Thunderstorms"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/15-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Mostly cloudy w/ t-storms"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/16-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Partly sunny w/ t-storms"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/17-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Rain"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/18-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Flurries"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/19-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Mostly cloudy w/ flurries"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/20-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Partly sunny w/ flurries"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/21-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Snow"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/22-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Mostly cloudy w/ snow"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/23-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Ice"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/24-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Sleet"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/25-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Freezing rain"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/26-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Rain and snow"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/29-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Hot"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/30-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Cold"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/31-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Day.IconPhrase === "Windy"){
                                                return(
                                                    <Card className="weatherContainerLight">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/32-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Day.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            return data;
                                        })
                                    }                            
                                </div>
                                ):
                                (<div className="weatherOuterContainer">
                                    {   
                                        weather?.DailyForecasts?.map(data => {
                                            const dateTime = new Date(data.Date);
                                            let dateStr = dateTime.toString();
                                            let trimDate = dateStr.substring(0, dateStr.length-50);
                                            if(data.Night.IconPhrase === "Cloudy"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/07-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }

                                            if(data.Night.IconPhrase === "Dreary (overcast)"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/08-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Fog"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/11-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Showers"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/12-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Thunderstorms"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/15-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Rain"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/18-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Flurries"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/19-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Snow"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/22-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Ice"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/24-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Sleet"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/25-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Freezing rain"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/26-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Rain and snow"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/29-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Hot"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/30-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Cold"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/31-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Windy"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/32-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Clear"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/33-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Mostly clear"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/34-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Partly cloudy"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/35-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Intermittent clouds"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/36-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Hazy moonlight"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/37-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Mostly cloudy"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/38-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Partly cloudy w/ showers"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/39-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Mostly cloudy w/ showers"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/40-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Partly cloudy w/ t-Storms"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/41-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Mostly cloudy w/ t-Storms"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/42-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Mostly cloudy w/ flurries"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/43-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Mostly cloudy w/ snow"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/44-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            if(data.Night.IconPhrase === "Mostly cloudy w/ t-storms"){
                                                return(
                                                    <Card className="weatherContainer">
                                                        <Card.Text className="dateCss">
                                                        {trimDate}
                                                        </Card.Text>
                                                        <Card.Img className="weatherImage" variant="top" src="https://developer.accuweather.com/sites/default/files/42-s.png" />
                                                        <Card.Body>
                                                            <Card.Title className="cardTitle">{data.Night.IconPhrase}</Card.Title>
                                                            <Card.Text className="cardText">
                                                            {data.Temperature.Minimum.Value + data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value + data.Temperature.Maximum.Unit}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    )
                                            }
                                            return data;
                                        })
                                    }
                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
       </>
    )
}
