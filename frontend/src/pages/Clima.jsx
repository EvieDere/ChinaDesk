import { Link } from "react-router-dom";
import { useState } from "react";
import { getWeatherData } from "../services/api_clima";
import "../assets/styles/climastyles.css";
import dropIcon from "../assets/resources/imgClima/droplet.png";
import windIcon from "../assets/resources/imgClima/wind.png";
import locationIcon from "../assets/resources/imgClima/location.png";

export default function ApiClima() {
    const [cityDisplay, setCityDisplay] = useState("");
    const [weatherData, setWeatherData] = useState("");
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        
        const data = await getWeatherData(cityDisplay);
        if (!data) {
            setError("Ciudad no encontrada.");
        } else {
            setWeatherData(data);
            setError("");
        }
    };

    return (
        <>
            <div className="mainClima"></div>
            
            <header className="headerClima">
                    <h2 className="logoClima">Clima</h2>
                    <nav className="navigationClima">
                        <Link to="/Home" className="btnToHome">Home</Link>
                    </nav>
            </header>
            
            <div className="contentClima">
                <form className="formClima" onSubmit={handleSearch}>
                    <label className="cityTitle">¡Busca el Clima de tu Ciudad!</label>
                    <input
                        type="text"
                        id="city-input"
                        name="city"
                        placeholder="Ingrese el nombre de su ciudad"
                        required
                        className="cityInput"
                        value={cityDisplay}
                        onChange={(e) => setCityDisplay(e.target.value)}
                    />
                    <button id="search" className="buscarButton">Buscar</button>
                </form>

                {weatherData && (
                    <div className="resultadosContainer" id="resultsClima">
                        <div id="resultadosClima">
                            <h2>
                                <img src={locationIcon} alt="Ubicación" className="locationIcon" />
                                <span id="city" className="citydisplay">{weatherData.name}</span>
                            </h2>
                        </div>

                        <p id="temperature" className="tempClima">
                            <span>{parseInt(weatherData.main.temp)}</span>&deg;C
                        </p>

                        <div id="description-container" className="descContainer">
                            <p id="description" className="descClima">{weatherData.weather[0].description}</p>
                            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Condiciones del clima" id="weather-icon" className="weatherIcon"/>
                        </div>

                        <div id="details-container" className="detailsContainer">
                            <p id="humidity">
                                <img src={dropIcon} alt="Humedad" className="humidityIcon" />
                                <span>{weatherData.main.humidity}%</span>
                            </p>
                            <p id="wind">
                                <img src={windIcon} alt="Viento" className="windIcon" />
                                <span>{weatherData.wind.speed} km/h</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};