import React, { Component } from 'react';
import DayWeather from './DayWeather';
import '../styles/weather.scss';
// images
import sunImg from '../img/sun.png';
import cloudImg from '../img/cloud.png';
import rainImg from '../img/rain.png';
import stormImg from '../img/storm.png';
import snowImg from '../img/snow.png';

class Weather extends Component {
  getTitle() {
    switch (this.props.title) {
      case 'Clear':
        return <span className="sunny">sunny.</span>
      case 'Clouds':
        return <span className="cloudy">cloudy.</span>
      case 'Rain':
      case 'Drizzle':
      case 'Mist':
        return <span className="raining">raining.</span>
      case 'Thunderstorm':
        return <span className="storm">a storm.</span>
      case 'Snow':
        return <span className="snowing">snowing.</span>
      default:
        return null;
    }
  };

  getSrcIcon(index) {
    switch (this.props.daysData[index].condition) {
      case 'Clear':
        return sunImg
      case 'Clouds':
        return cloudImg
      case 'Rain':
      case 'Drizzle':
      case 'Mist':
        return rainImg
      case 'Thunderstorm':
        return stormImg
      case 'Snow':
        return snowImg
      default:
        return null;
    }
  };

  render() {
    const { title, city, country, temperature, humidity, wind, description, error, daysData } = this.props;

    return (
      <div className="weather-info">
        {title && <h1 className="main-title">It's <br />{this.getTitle()}</h1>}
        {title && <div className="card main-card">
          {city && country && <h4 className="main-card__location">{city}, {country}</h4>}
          {temperature && <p className="main-card__stat">Temperature: {Math.floor(temperature)} °C</p>}
          {humidity && <p className="main-card__stat">Humidity: {humidity} %</p>}
          {wind && <p className="main-card__stat">Wind: {wind} km/h</p>}
          {description && <p className="main-card__stat">Conditions: {description}</p>}
          {error && <p className="error">{error}</p>}
        </div>}

        {title && <ul className="day-card-group">
          {daysData.map((day, index) => {
            return (
              <DayWeather
                key={day.id}
                date={day.data}
                src={this.getSrcIcon(index)}
                temp={Math.floor(day.dayTemperature)}
                wind={day.dayWind}
              />
            )
          })}
        </ul>}
      </div>
    );
  }
}

export default Weather;