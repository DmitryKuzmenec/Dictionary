import './App.css';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import Home from './components/Home'
import Admin from './components/Admin'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Counter from './components/Counter'
import Dictionaries from './components/Dictionaries'
import Learning from './components/Learning'
import Exam from './components/Exam'

import Auth from './middleware/auth'

function App(props) {
  const { history } = props;
  return (  
    <div className="App">
      <Switch>
        <Route history={history} path="/counter" component={Counter}/>
        <Route history={history} path='/signin' component={Signin}/>
        <Route history={history} path='/signup' component={Signup}/>
        <Route history={history} path='/home'  component={Home}/>
        <Route history={history} path='/dictionaries' component={Dictionaries}/>
        <Route history={history} path='/learning' component={Learning}/>
        <Route history={history} path='/exam' component={Exam}/>
        <Route history={history} path='/home1' render={() => {return <Auth next={Home}/>}} />
        <Route history={history} path='/adm' render={() => {return <Auth next={Admin}/>}} />
        <Redirect from='/' to='/home'/>
      </Switch>
    </div>
  );
}

export default App;
