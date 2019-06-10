import React from 'react';


class WeatherBox extends React.Component {
  render() {
    let props = this.props;
    return (
      <div>
        <p>
        {props.tempMin && props.tempMax ?
        `LoHi: ${props.tempMin}°F | ${props.tempMax}˚F` : ""}
        </p>
        <p>{props.sunMovement} |<span> Current: {currentTime()}</span></p>
        <p>{props.windSpeed ? `Wind Speed: ${props.windSpeed} mph` : ""}</p>
        <p>{props.humidity ? `Humidity: ${props.humidity}%` : ""}</p>
        <p>{props.pressure ? `Pressure: ${props.pressure} hPa` : ""}</p>
      </div>
  )}
}


let afterNoonCheck = () => {
  let date = new Date();
  let hours = date.getHours();
  let isAfterNoon = (hours >= 12) ? true : false;
  return isAfterNoon;
}


let currentTime = () => {
  let date = new Date();
  let hours = date.getHours();
  hours = (hours > 12) ? hours - 12 : hours;
  let minutes = "0" + date.getMinutes();
  let formattedTime = hours + ':' + minutes.substr(-2)
  return formattedTime + (afterNoonCheck() ? 'PM' : 'AM');
}



export default WeatherBox 