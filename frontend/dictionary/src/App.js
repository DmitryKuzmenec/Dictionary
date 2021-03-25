import './App.css';

import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

import Home from "./components/Home"
import Admin from "./components/Admin"
import Signup from './components/Signup'

function App(props) {
  const { history } = props;
  return (  
    <div className="App">
      <Switch>
        <Route history={history} path='/home' component={Home} />
        <Route history={history} path='/signup' component={Signup}/>
        <Route history={history} path='/s/cp/adm' component={Admin} />
        <Redirect from='/' to='/home'/>
      </Switch>
    </div>
  );
}

export default App;
