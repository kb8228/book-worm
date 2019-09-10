import React from "react";
import ReactDOM from "react-dom";

class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedInput: "",
      results: null
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
    this.setState({ formattedInput: string.replace(forbiddenChars, "") }, this.fetchResults)
  }

  fetchResults(page = 1) {
    if (this.state.formattedInput.length < 3) { return; }

    const queryString = this.state.formattedInput.trim().replace(" ", "+")

    fetch(`http://openlibrary.org/search.json?q=${queryString}&page=${page}`)
      .then(function(response) {
        return response.json()
      })
      .then(results => {
        this.setState({ results: results })
      })
      .catch(function(error) {
        console.error("Oh, trouble!", error.message);
      });
  }

  renderResultsList() {
    if (!this.state.results) { return null; }

    const firstTen = this.state.results.docs.slice(0, 10).map(doc => {
      return <li key={doc.key}>{doc.title} - by {doc.author_name}</li>
    })

    return <ul>{firstTen}</ul>
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
        { this.renderResultsList() }
      </div>
    );
  }
}

ReactDOM.render(<HelloMessage name="yeaaah" />, document.getElementById("app"));

// open library api query example
// http://openlibrary.org/search.json?q=the+lord+of+the+rings&page=2