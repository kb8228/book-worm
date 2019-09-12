import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import CssBaseline from '@material-ui/core/CssBaseline';
import NewApp from './App2';

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <NewApp />
  </Provider>,
  document.getElementById("app")
);