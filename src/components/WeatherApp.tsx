import React from "react";
import { fetchWeather } from "../api/weatherApi";
import { WeatherData, DailyForecast } from "../types/weatherInterfaces";
import rainy from "../assets/images/rainy.png";
import humidity from "../assets/images/humidity.png";
import wind from "../assets/images/wind.png";
import pressure from "../assets/images/pressure.png";
class WeatherApp extends React.Component<
  {},
  {
    city: string;
    weather?: { today: WeatherData; forecast: DailyForecast[] } | null;
    error?: string;
    loading: boolean;
  }
> {
  state = {
    city: "Tehran",
    weather: null,
    error: "",
    loading: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ city: event.target.value.trim() });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ loading: true });

    try {
      const weatherData = await fetchWeather(this.state.city);
      this.setState({ weather: weatherData, error: "", loading: false });
    } catch (error) {
      this.setState({ error: "Error fetching weather data", loading: false });
    }
  };

  componentDidMount() {
    this.handleSubmit(new Event("submit"));
  }

  render() {
    const { city, weather, error, loading } = this.state;

    return (
      <div className="max-w-xl px-4 py-4 mx-auto">
        <form className="flex justify-between p-5" onSubmit={this.handleSubmit}>
          <div className="flex items-center border-b border-teal-500 py-2">
    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"  type="text"
            value={city}
            onChange={this.handleChange}
            placeholder="Enter city name" aria-label="City name"/>
    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
    Search
    </button>
  
  </div>
        </form>
        {loading &&
   
    <><img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon" /><p>Loading/</p></>
  
}
        {error && <p>Error: {error}</p>}
        {weather && (
          <div>
            <div className=" bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-6xl font-bold">
                    {" "}
                    {weather.today.current.temp_c}°C
                  </span>
                  <span className="font-semibold mt-1 text-gray-500">
                    {weather.today.current.condition.text}
                  </span>
                </div>
                <div className="h-24 w-24 fill-current text-yellow-400">
                  <img
                    src={`${weather.today.current.condition.icon}`}
                    alt="Weather Icon"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-12">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-lg">
                    {weather.today.current.humidity}%
                  </span>
                  <div
                    className="h-10 w-10 fill-current text-gray-400 mt-3"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    {" "}
                    <img className="h-8 w-8" src={humidity} />
                  </div>
                  <span className="text-xs font-semibold text-gray-400">
                    Humidity
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-lg">
                    {weather.today.current.wind_kph} KMPH
                  </span>
                  <div
                    className="h-10 w-10 fill-current text-gray-400 mt-3"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    {" "}
                    <img className="h-8 w-8" src={wind} />
                  </div>
                  <span className="text-xs font-semibold text-gray-400">
                    Wind
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-lg">
                    {weather.today.current.precip_mm}
                  </span>
                  <div
                    className="h-10 w-10 fill-current text-gray-400 mt-3"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    {" "}
                    <img className="h-8 w-8" src={rainy} />
                  </div>
                  <span className="text-xs font-semibold text-gray-400">
                    Chance of Rain
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-lg">
                  {(weather.today.current.pressure_mb).toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".")} in
                  </span>
                  <div
                    className="h-10 w-10 fill-current text-gray-400 mt-3"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    {" "}
                    <img className="h-8 w-8" src={pressure} />
                  </div>
                  <span className="text-xs font-semibold text-gray-400">
                    pressure
                  </span>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold p-8">Next 7 Days</div>
            {weather && (
  <div className="flex flex-wrap justify-center -mx-4">
    {weather.forecast.map((day) => (
      <div key={day.date_epoch} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
        <div className="bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40  border border-gray-300 rounded">
          <div className="flex flex-col items-center ">
            <img src={`${day.day.condition.icon}`} alt="forecast" />
            <p className="text-3xl font-semibold text-center text-gray-800">{day.day.maxtemp_c}</p>
            <p className="text-lg text-center text-gray-500">{day.date}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
          </div>
        )}
      </div>
    );
  }
}

export default WeatherApp;
