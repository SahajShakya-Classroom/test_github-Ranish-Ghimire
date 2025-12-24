import 'dotenv/config';

const API_KEY = process.env.API_KEY;

const LAT = 27.7097467;
const LON = 85.32473286318762;

const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

const fetchWeeklyWeatherData = async () =>  {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    // console.log(data);
    
    console.log("Next 5 Days Weather Forecast for Kathmandu");
    console.log("-------------------------------");

    const dailyForecast = {};

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();

      if (!dailyForecast[date]) {
        dailyForecast[date] = item;
      }
    });

    // console.log('dailyforecast:', dailyForecast);

    Object.values(dailyForecast).forEach(day => {
      const date = new Date(day.dt * 1000);

      const day_of_the_week = date.toLocaleDateString("en-US", {
        weekday: "long"
      });

      console.log(`${day_of_the_week}`);
      console.log(`Temperature: ${day.main.temp} deg cel`);
      console.log(`Weather: ${day.weather[0].description}`);
      console.log(`Humidity: ${day.main.humidity}%`);
      console.log(`Wind Speed: ${day.wind.speed} m/s`);
      console.log("-------------------------------");
    });

  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchWeeklyWeatherData();
