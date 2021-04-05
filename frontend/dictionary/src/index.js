import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom"
import {createBrowserHistory} from 'history'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Reducer from './reducers/index'
import {Increment} from './actions'

const history = createBrowserHistory();
const store = createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.dispatch(Increment());
store.dispatch(Increment());

ReactDOM.render(
  <React.StrictMode>
    <HashRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
