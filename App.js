import React from "react";
import ReactDOM from "react-dom";
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import memoize from 'memoize-one';
import { FixedSizeList, areEqual } from 'react-window';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedInput: "",
      result: null,
      currentTab: 0,
      tabs: ["title", "author"]
    };
  }

  handleTabChange = (e, newValue) => {
    this.setState({ currentTab: newValue }, this.fetchResult)
  }

  handleInput = event => {
    this.sanitizeInput(event.target.value)
  }

  sanitizeInput(string) {
    // matches all but alphanumeric, dashes, or spaces
    const forbiddenChars = /[^a-zA-Z0-9\- ]+$/g;
    this.setState({ formattedInput: string.replace(forbiddenChars, "") }, this.fetchResult)
  }

  fetchResult(page = 1) {
    if (this.state.formattedInput.length < 3) { return; }

    const searchBy = this.state.tabs[this.state.currentTab]
    const queryString = this.state.formattedInput.trim().replace(" ", "+")

    fetch(`http://openlibrary.org/search.json?${searchBy}=${queryString}&page=${page}`)
      .then(function(response) {
        return response.json()
      })
      .then(result => {
        this.setState({ result: result })
      })
      .catch(function(error) {
        console.error("Oh, trouble!", error.message);
      });
  }

  renderResultsList() {
    if (!this.state.result) { return null; }
    if (!this.state.result.docs.length) { return <div>No books found :(</div>; }
    const { docs } = this.state.result;

    const createItemData = memoize((items) => ({ items }));
    const itemData = createItemData(docs);

    const row = React.memo((props) => {
      const book = props.data.items[props.index]
      return (
        <ListItem button style={props.style} key={props.index}>
          <ListItemText primary={`${book.title}, by ${book.author_name || "author unknown"}`} />
        </ListItem>
      );
    }, areEqual);

    return (
      <FixedSizeList itemData={itemData} height={400} width={"100%"} itemSize={46} itemCount={docs.length}>
        { row }
      </FixedSizeList>
    );
  }

  render() {
    const tabProps = index => ({
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`
    });

    return (
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1">Book Worm</Typography>
        <Tabs
          value={this.state.currentTab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Title" {...tabProps(0)} />
          <Tab label="Author" {...tabProps(1)} />
        </Tabs>
        <Input
          type="text"
          placeholder="title or author"
          onChange={this.handleInput}
          value={this.state.formattedInput}
        />
        { this.renderResultsList() }
      </Container>
    );
  }
}

export default App;