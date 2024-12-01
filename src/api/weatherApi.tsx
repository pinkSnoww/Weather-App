
import { WeatherData, DailyForecast } from '../types/weatherInterfaces';
const apiKey = 'c3323171f3ea49299a3114222242705'; 

     async function fetchWeather(city: string): Promise<{ today: WeatherData; forecast: DailyForecast[] }> {
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;
      const response = await fetch(url);
      const data = await response.json();
      const today: WeatherData['today'] = {
    
        current: {
          temp_c: data.current.temp_c,
          humidity:data.current.humidity,
          wind_kph:data.current.wind_kph,
          precip_mm:data.current.precip_mm,
          pressure_mb:data.current.pressure_mb,
          condition: {
            text: data.current.condition.text,
            icon: data.current.condition.icon,
          },
          location: data.location,
         
          forecast: {
            forecastday: data.forecast.forecastday.slice(0, 1),
          },
        },
      };
      const forecast: DailyForecast[] = data.forecast.forecastday.map((day) => ({
        date: day.date,
        day: {
          maxtemp_c: day.day.maxtemp_c,
          mintemp_c: day.day.mintemp_c,
          condition: {
            text: day.day.condition.text,
            icon: day.day.condition.icon,
          },
        },
        }));
      return { today, forecast };
    }
    export  {fetchWeather}
// -------------------------


