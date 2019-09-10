import React from "react";
import ReactDOM from "react-dom";

function fetchResults(queryString) {
  fetch(`http://openlibrary.org/search.json?q=${queryString}&page=1`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
}

class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedInput: ""
    };
  }

  componentDidMount() {

  }

  handleInput = (event) => {
    this.sanitizeInput(event.target.value)
  }

  sanitizeInput(string) {
    // matches all but alphanumeric, underscores, dashes, or spaces
    const forbiddenChars = /[^a-zA-Z0-9_\- ]+$/g;
    this.setState({ formattedInput: string.replace(forbiddenChars, "") })
  }

  render() {
    return (
      <div className="wrapper">
        <div>Hello {this.props.name}</div>
        <input
          type="text"
          placeholder="title or author"
          onChange={this.handleInput}
          value={this.state.formattedInput}
        />
      </div>
    );
  }
}

ReactDOM.render(<HelloMessage name="yeaaah" />, document.getElementById("app"));

// open library api query example
// http://openlibrary.org/search.json?q=the+lord+of+the+rings&page=2