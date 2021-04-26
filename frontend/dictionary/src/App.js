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
import DictionaryEdit from './components/DictionaryEdit'

import Auth from './middleware/auth'

function App(props) {
  const { history } = props;
  return (  
    <div className="App">
      <Switch>
        <Route history={history} path="/counter" exact component={Counter}/>
        <Route history={history} path='/signin' exact component={Signin}/>
        <Route history={history} path='/signup' exact component={Signup}/>
        <Route history={history} path='/dictionaries' exact component={Dictionaries}/>
        <Route history={history} path='/learning' exact component={Learning}/>
        <Route history={history} path='/exam' exact component={Exam}/>
        <Route history={history} path='/home' exact render={() => {return <Auth next={Home}/>}} />
        <Route history={history} path='/adm' exact render={() => {return <Auth next={Admin}/>}} />
        {/* <Route history={history} path='/dictionaries/edit' exact render={() => {return <Auth next={DictionaryEdit}/>}} /> */}
        <Route history={history} path='/dictionaries/edit' exact component={DictionaryEdit}/>
        <Redirect from='/' to='/home'/>
      </Switch>
    </div>
  );
}

export default App;
