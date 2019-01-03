import React from 'react';
import '../styles/form.scss';

const Form = props => (
  <form className="weather-form" onSubmit={props.getWeather}>
    <input className="weather-form__input" type="text" name="city" placeholder="Enter location..." />
    <button className="weather-form__button">Get Weather</button>
  </form>
);

export default Form;