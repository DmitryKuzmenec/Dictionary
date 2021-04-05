import './App.css';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import Home from './components/Home'
import Admin from './components/Admin'
import Signup from './components/Signup'
import Login from './components/Login'
import Auth from './components/Auth'
import Counter from './components/Counter'

function App(props) {
  const { history } = props;
  return (  
    <div className="App">
      <Switch>
        <Route history={history} path="/counter" component={Counter}/>
        <Route history={history} path='/signup' component={Signup}/>
        <Route history={history} path='/login' component={Login}/>
        <Route history={history} path='/home' render={() => {return <Auth next={Home}/>}} />
        <Route history={history} path='/adm' render={() => {return <Auth next={Admin}/>}} />
        <Redirect from='/' to='/counter'/>
      </Switch>
    </div>
  );
}

export default App;
