import React from 'react';

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};

class Weather extends React.Component {

  
  render() {
    let props = this.props;
    return (
      <div>
        <img 
          className="weatherIcon" 
          src={props.imageSrc} />
        <p 
          className="description">
            {props.description 
              ? `${props.description} in ` : ""}
          <span>
            {props.city 
              ? `${props.city.capitalize()}, ${props.country}` : ""}
          </span>
        </p>
        <p>{props.date ? `${props.date}` : ""}</p>
        <p>
          {props.temp ? `${props.temp}˚F` : ""}
        </p>
      </div>

    )
  }
}


export default Weather ;