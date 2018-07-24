var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_React$Component) {
  _inherits(Page, _React$Component);

  function Page() {
    _classCallCheck(this, Page);

    var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.state = {
      celcius: true
    };
    return _this;
  }

  _createClass(Page, [{
    key: "handleClick",
    value: function handleClick() {
      this.setState({
        celcius: !this.state.celcius
      });
    }

    // This function loads before the page loads. It is how I'm handling loading the
    // data before it's pulled in with AJAX

  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      navigator.geolocation.getCurrentPosition(function (location) {
        $.ajax({
          type: "GET",
          url: getWeatherUrl(location.coords.latitude, location.coords.longitude),
          context: _this2,
          success: function success(geoData) {
            this.setState({
              tempFahrenheit: geoData.main.temp,
              tempCelcius: toCelcius(geoData.main.temp),
              humidity: geoData.main.humidity,
              pressure: geoData.main.pressure,
              tempMin: geoData.main.temp_min,
              tempMax: geoData.main.temp_max,
              seaLevel: geoData.main.sea_level,
              windSpeed: (geoData.wind.speed / .44704).toFixed(2),
              weather: geoData.weather[0].main,
              description: geoData.weather[0].description.capitalize(),
              id: geoData.weather[0].id,
              icon: geoData.weather[0].icon,
              sunrise: geoData.sys.sunrise,
              sunset: geoData.sys.sunset,
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              date: formatDate(new Date())
            });
          }
        });
      });

      // After getting the coordinates from the browser
      // we are making an AJAX call to get geocoding data from
      // Google Maps API
      navigator.geolocation.getCurrentPosition(function (location) {
        $.ajax({
          type: "GET",
          url: getGeocoding(location.coords.latitude, location.coords.longitude),
          context: _this2,
          success: function success(geoData) {
            this.setState({
              city: geoData.results[3].formatted_address
            });
          }
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(Weather, {
          description: this.state.description,
          city: this.state.city,
          date: this.state.date,
          temp: this.state.celcius ? this.state.tempFahrenheit : this.state.tempCelcius,
          onClick: this.handleClick,
          country: this.state.country
        }),
        React.createElement(WeatherBox, {
          humidity: this.state.humidity,
          pressure: this.state.pressure,
          seaLevel: this.state.seaLevel,
          tempMax: this.state.tempMax,
          tempMin: this.state.tempMin,
          windSpeed: this.state.windSpeed,
          imageSrc: this.state.icon ? "https://res.cloudinary.com/lucedesign/image/upload/v1509486590/svg%20weather%20icons/" + idIconLookup[this.state.id] : "https://res.cloudinary.com/lucedesign/image/upload/v1509486574/svg%20weather%20icons/day.svg",
          country: this.state.country
        })
      );
    }
  }]);

  return Page;
}(React.Component);

// Contains the weather, description, city, date, and temp


var Weather = function Weather(props) {
  return React.createElement(
    "div",
    { className: "weather" },
    React.createElement(
      "p",
      null,
      props.description ? props.description + " in" : ""
    ),
    React.createElement(
      "p",
      null,
      props.city ? "" + props.city : ""
    ),
    React.createElement(
      "p",
      null,
      props.date ? "" + props.date : ""
    ),
    React.createElement(
      "p",
      { onClick: props.onClick },
      props.temp ? props.temp + "\xB0" : ""
    )
  );
};

// The rounded weather box that contains the icon and additional weather data
var WeatherBox = function WeatherBox(props) {
  return React.createElement(
    "div",
    { className: "weather-box" },
    React.createElement(
      "div",
      { className: "humidity container" },
      React.createElement(
        "p",
        null,
        props.pressure ? "Pressure: " + props.pressure + " hPa" : ""
      ),
      React.createElement(
        "p",
        null,
        props.humidity ? "Humidity: " + props.humidity + "%" : ""
      ),
      React.createElement(
        "p",
        null,
        props.seaLevel ? "Sea Level: " + props.seaLevel : ""
      )
    ),
    React.createElement("img", { src: props.imageSrc }),
    React.createElement(
      "div",
      { className: "tempMax container" },
      React.createElement(
        "p",
        null,
        props.tempMax ? "Max Temp: " + props.tempMax + "\xB0" : ""
      ),
      React.createElement(
        "p",
        null,
        props.tempMin ? "Min Temp: " + props.tempMin + "\xB0" : ""
      ),
      React.createElement(
        "p",
        null,
        props.windSpeed ? "Wind Speed: " + props.windSpeed + " mph" : ""
      )
    )
  );
};

// Add a function to the String type to capitalize all letters in a sentence
String.prototype.capitalize = function () {
  return this.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};

// Helper functions -------------------------------------------------
var toCelcius = function toCelcius(temp) {
  return ((temp - 32) * 5 / 9).toFixed(1);
};

// Check if it's between 6am and 6pm and return true or false
var isDayTime = function isDayTime() {
  var date = new Date();
  var hour = date.getHours();
  if (hour < 18 && hour > 6) {
    return true;
  } else {
    return false;
  }
};

// Get a pretty date
var formatDate = function formatDate(date) {
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + " " + day + ", " + year;
};

var getWeatherUrl = function getWeatherUrl(lat, long) {
  return "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&,us&appid=cdd2ee522563ce044210c7ce28200c53";
};

var getGeocoding = function getGeocoding(lat, long) {
  return "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&sensor=true";
};

// Icon Lookup Table ----------------------------------------------------------------------------
var idIconLookup = {
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

// Render the Page component
ReactDOM.render(React.createElement(Page, null), document.getElementById("app"));