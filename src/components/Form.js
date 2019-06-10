import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
      <form
        className="form" 
        onSubmit={this.props.onSubmit}
        
        >

        <input
          className="inputField" 
          type="text" 
          placeholder="Enter City"
          onChange={this.props.onChange} 
        />

        <input
          className="submitButton" 
          type="submit" 
          value="Submit"
        />
        
      </form>
      </div>
  )
}
}


export default Form ;