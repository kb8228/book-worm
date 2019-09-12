import React, { useState, useEffect, useSelector, useDispatch } from "react";

import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import SearchTabs from './components/SearchTabs';
import ResultsList from './components/ResultsList';

const NewApp = () => {
  const [hasError, setErrors] = useState(false);
  const [formattedInput, setInput] = useState(false);
  const currentTab = useSelector(state => state.currentTab)
  const currentQuery = useSelector(state => state.currentQuery)
  const dispatch = useDispatch();

  const handleInput = event => {
    formatInput(event.target.value)
  }

  const formatInput = string => {
    // matches all but alphanumeric, dashes, or spaces
    const forbiddenChars = /[^a-zA-Z0-9\- ]+$/g;
    const formattedInput = string.replace(/[^a-zA-Z0-9\- ]+$/g, "")
    setInput(formattedInput);
  }

  const createQuery = () => {
    formattedInput.trim().replace(" ", "+");
    dispatch({ type: SET_QUERY, payload: query })
  } // TODO make debounce

  async function fetchBooks() {
    const res = await fetch(`http://openlibrary.org/search.json?${currentTab}=${currentQuery}`);
    res
      .json()
      .then(data => dispatch({ type: TYPES.SET_RESULT, payload: data }))
      .catch(err => setErrors(err));
  }

  useEffect(
    () => { fetchBooks() },
    [currentTab, currentQuery]
  );

  return (
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1">Book Worm</Typography>
        <SearchTabs />
        <Input
          type="text"
          placeholder="title or author"
          onChange={handleInput}
          value={formattedInput}
        />
        { /* ResultsHeader */ }
        { /* <ResultsList /> */ }
        { /* error */ }
      </Container>
    );
}

export default NewApp;