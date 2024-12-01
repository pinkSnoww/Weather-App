

interface ForecastProps {
    forecast: DailyForecast;
  }
  
  const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
    const date = new Date(forecast.dt * 1000); // Convert timestamp to Date object
    const formattedDate = date.toLocaleDateString();
  
    return (
      <div>
        <p>{formattedDate}</p>
        <p>High: {forecast.temp.max}°C, Low: {forecast.temp.min}°C</p>
        <p>{forecast.weather[0].description}</p>
      </div>
    );
  };
  
  export {Forecast};