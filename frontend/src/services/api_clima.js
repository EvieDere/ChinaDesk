const apiKey = "654d69e74ca71c0f201376e3b231acc6";

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=es`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    if(!res.ok) throw new Error("Error al obtener la API externa.");
    return data;
};

export { getWeatherData };