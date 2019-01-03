import React from 'react';
import '../styles/weather.scss';

const DayWeather = props => (
  <li className="card day-card">
    <h5 className="day-card__title">{props.date}</h5>
    <img className="icon" src={props.src} alt="weather icon" />
    <p className="day-card__subtitle">{props.temp} °C</p>
    <p className="day-card__subtitle">{props.wind} km/h</p>
  </li>
);

export default DayWeather;