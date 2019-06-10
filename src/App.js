import React from 'react';
import './App.css';
import axios from 'axios';
import Form from './components/Form.js';
import Weather from './components/Weather.js';
import WeatherBox from './components/WeatherBox.js';

const key = '41964d2653c96175c88d49f6ba567677';

const getWeatherUrl = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city},us&units=imperial&,us&appid=${key}`;
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: ''
    }
  }

  getWeather(city) {
    console.log('making request, city must have been set')
    console.log(this.state.city)

    axios.get(getWeatherUrl(city))
    .then(response => {
      this.setState({
        name: response.data.name,
        tempFahrenheit: response.data.main.temp,
        // tempCelcius: toCelcius(response.data.main.temp),
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        tempMin: response.data.main.temp_min,
        tempMax: response.data.main.temp_max,
        windSpeed: (response.data.wind.speed / .44704).toFixed(2),
        weather: response.data.weather[0].main,
        country: response.data.sys.country,
        description: response.data.weather[0].description.capitalize(),
        id: response.data.weather[0].id,
        icon: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
        sunrise: formatTime(response.data.sys.sunrise),
        sunset: formatTime(response.data.sys.sunset),
        latitude: response.data.latitude,
        longitude:  response.data.longitude,
        date: formatDate(new Date()),
        loading: false,
        error: null,
      }, console.log(this.state))
    })
  }

  test(e) {
    // console.log(e.target.value)
    this.setState({
      title: e.target.value
    })
    console.log(this.state)
  }


  handleSubmit(e) {
    e.preventDefault()
    if(this.state.city === '') {
      console.log('no city, woops')
      return false;
    } else (
      this.getWeather(this.state.city)
    )
  }
  
  handleChange(e) {
    console.log('log before set state', e.target.value)
    this.setState({
      city: e.target.value.split(' ').join('+'),
    })
    console.log('after set state', e.target.value)
  }

  render() {

    let state = this.state
    return (
      
      <div className="container">

        <Form 
          onSubmit={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
        />

        <Weather
          imageSrc={state.icon
            ? `https://res.cloudinary.com/dd3sr6mdw/image/upload/v1554398295/${idIconLookup[this.state.id]}`
            : `https://res.cloudinary.com/dd3sr6mdw/image/upload/v1554398295/weather.svg`
          }
          description={state.description}
          city={state.name}
          date={state.date}
          temp={state.tempFahrenheit}
          country={state.country}
        />

        <WeatherBox
          sunMovement={isDayTime() ? `Sunset: ${this.state.sunset}` :
           `Sunrise: ${state.sunrise}`}
          humidity={state.humidity}
          pressure={state.pressure}
          tempMax={state.tempMax}
          tempMin={state.tempMin}
          windSpeed={state.windSpeed}
        />
      </div>
    )
  }
}


// Check if it's between 6am and 6pm and return true or false
let isDayTime = () => {
  let date = new Date();
  let hour = date.getHours();
  if (hour < 18 && hour > 6) {
    return true;
  } else {
    return false;
  }
};

let afterNoonCheck = () => {
  let date = new Date();
  let hours = date.getHours();
  let isAfterNoon = (hours >= 12) ? true : false;
  return isAfterNoon;
}

let formatTime = (time) => {
  let date = new Date(time*1000);
// Hours part from the timestamp
  let hours = date.getHours();
  hours = (hours > 12) ? hours - 12 : hours;
// Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
// Will display time in HH:MM format
  let formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime + (!afterNoonCheck() ? 'PM' : 'AM')
};

// Get a pretty date
let formatDate = (date) => {
  let monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
}


// Icon Lookup Table ----------------------------------------------------------------------------
let idIconLookup = {
  200: "thunder.svg",
  201: "thunder.svg",
  202: "thunder.svg",
  210: "thunder.svg",
  211: "thunder.svg",
  212: "thunder.svg",
  221: "thunder.svg",
  230: "thunder.svg",
  231: "thunder.svg",
  232: "thunder.svg",
  300: "rainy-4.svg",
  301: "rainy-4.svg",
  302: "rainy-4.svg",
  310: "rainy-5.svg",
  311: "rainy-5.svg",
  312: "rainy-5.svg",
  313: "rainy-6.svg",
  314: "rainy-6.svg",
  321: "rainy-6.svg",
  500: "rainy-7.svg",
  501: "rainy-7.svg",
  502: "rainy-7.svg",
  503: "rainy-7.svg",
  504: "rainy-7.svg",
  511: "rainy-7.svg",
  520: "rainy-7.svg",
  521: "rainy-7.svg",
  522: "rainy-7.svg",
  531: "rainy-7.svg",
  600: "snowy-4.svg",
  601: "snowy-4.svg",
  611: "snowy-4.svg",
  612: "snowy-5.svg",
  615: "snowy-5.svg",
  616: "snowy-5.svg",
  620: "snowy-6.svg",
  621: "snow-6.svg",
  622: "snowy-6.svg",
  701: "cloudy.svg",
  711: "cloudy.svg",
  721: "cloudy.svg",
  731: "cloudy.svg",
  741: "cloudy.svg",
  751: "cloudy.svg",
  761: "cloudy.svg",
  762: "cloudy.svg",
  771: "cloudy.svg",
  781: "cloudy.svg",
  800: isDayTime() ? "day.svg" : "night.svg",
  801: isDayTime() ? "cloudy-day-3.svg" : "cloudy-night-3.svg",
  802: isDayTime() ? "cloudy-day-3.svg" : "cloudy-night-3.svg",
  803: isDayTime() ? "cloudy-day-3.svg" : "cloudy-night-3.svg",
  804: isDayTime() ? "cloudy-day-3.svg" : "cloudy-night-3.svg"
};



export default App;
