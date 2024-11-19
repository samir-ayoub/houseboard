import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { WEATHER_DATA_MOCK } from "../../test/testData";
import { WeatherData } from "./WeatherTypes";
import {
  WEATHER_BASE_URL,
  WEATHER_LISBON_COORDS,
} from "../../constants/weather";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const weatherUrl = `${WEATHER_BASE_URL}?lat=${WEATHER_LISBON_COORDS.lat}&lon=${WEATHER_LISBON_COORDS.lon}&units=metric&appid=${apiKey}`;

  useEffect(() => {
    if (process.env.REACT_APP_USE_MOCK_DATA === "true") {
      setWeatherData(WEATHER_DATA_MOCK);
      setLoading(false);
      return;
    }

    axios
      .get(weatherUrl)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar a previsão do tempo.");
        setLoading(false);
      });
  }, [weatherUrl]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const noonForecast = weatherData?.list.filter((forecast) => {
    const date = new Date(forecast.dt * 1000);
    return date.getHours() === 12;
  });

  const [todayForecast, ...upcomingForecasts] = noonForecast || [];

  // Function to get the day of the week from dt_txt
  const getDayOfWeek = (dt_txt: string) => {
    const date = new Date(dt_txt);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getDay()];
  };

  // Function to get the icon URL
  const getIconUrl = (icon: string) => {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  };

  // Function to round temperature to one decimal place
  const roundToOneDecimal = (num: number) => {
    return Math.round(num * 10) / 10;
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography
            className="card_description"
            gutterBottom
            variant="h4"
            component="div"
          >
            {todayForecast.weather[0].description}
            <span>Lisbon</span>
          </Typography>

          {loading ? (
            <Loading />
          ) : (
            <div>
              <Grid container spacing={4}>
                <Grid size={6}>
                  <Grid container>
                    <Grid size={3}>
                      <Typography variant="h5" component="div">
                        <Box
                          component="img"
                          src={getIconUrl(todayForecast.weather[0].icon)}
                        />
                      </Typography>
                    </Grid>
                    <Grid size={9}>
                      <Typography
                        className="today_forecast_temperature"
                        gutterBottom
                        variant="h2"
                        component="div"
                      >
                        {roundToOneDecimal(todayForecast.main.temp)}
                        <span>°C</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid size={6}>
                  <Typography variant="body2" component="div">
                    Pressure: {todayForecast.main.pressure}
                  </Typography>
                  <Typography variant="body2" component="div">
                    Humidity: {todayForecast.main.humidity}%
                  </Typography>
                  <Typography variant="body2" component="div">
                    Wind Speed: {todayForecast.wind.speed}m/s
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {upcomingForecasts.map((forecast, index) => (
                  <Grid key={index} size={3}>
                    <Typography gutterBottom textAlign="center" variant="body2">
                      {getDayOfWeek(forecast.dt_txt)}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        component="img"
                        src={getIconUrl(forecast.weather[0].icon)}
                      />{" "}
                    </Box>
                    <Typography
                      gutterBottom
                      textAlign={"center"}
                      variant="subtitle2"
                    >
                      {roundToOneDecimal(forecast.main.temp)}°C
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Weather;
