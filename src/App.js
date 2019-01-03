import React, { Component } from 'react';
import uuid from 'uuid';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.scss';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  // initial state
  state = {
    title: undefined,
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    wind: undefined,
    description: undefined,
    error: undefined,
    days: []
  };

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    const apiCallCurrentWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const apiCallFourDaysWeather = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);

    // convert respons to json format
    const data = await apiCallCurrentWeather.json();
    const FourDaysData = await apiCallFourDaysWeather.json();

    // get four days data
    const updatedDays = [];
    const FourDaysList = [FourDaysData.list[8], FourDaysData.list[16], FourDaysData.list[24], FourDaysData.list[32]];

    FourDaysList.forEach(listItem => {
      const day = {
        id: uuid(),
        data: listItem.dt_txt.slice(0, 10),
        condition: listItem.weather[0].main,
        dayTemperature: listItem.main.temp,
        dayWind: listItem.wind.speed
      };

      updatedDays.push(day);
    });

    // if values exist (city === true ...)
    if (!city || data.message === 'city not found') {
      this.setState({
        title: undefined,
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        wind: undefined,
        description: undefined,
        error: 'Please enter the valid value.',
        days: []
      });
    } else {
      this.setState({
        title: data.weather[0].main,
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        description: data.weather[0].description,
        error: '',
        days: updatedDays
      });
    };
  };

  render() {
    const { temperature, city, country, humidity, wind, description, title, error, days } = this.state;

    return (
      <div className="App">
        <Titles />
        <div className="weather-container">
          <Form getWeather={this.getWeather} />
          <Weather
            temperature={temperature}
            city={city}
            country={country}
            humidity={humidity}
            wind={wind}
            description={description}
            title={title}
            error={error}
            daysData={days}
          />
        </div>
      </div>
    );
  }
}

export default App;