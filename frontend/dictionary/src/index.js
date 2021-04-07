import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom"
import {createBrowserHistory} from 'history'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Reducer from './reducers/index'
import {Increment} from './actions'

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Theme from './StylesMU'

//import 'fontsource-roboto';
import './index.css';

const history = createBrowserHistory();
const store = createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const theme = Theme(); 

ReactDOM.render(
  <React.StrictMode>
    <HashRouter history={history}>
      <Provider store={store}>
        <CssBaseline />
          <ThemeProvider theme={theme}>
            <Container maxWidth="lg" style={{ backgroundColor: ' #f7f7f7 ', height: '100vh' }} >
              <App />
            </Container>
          </ThemeProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
