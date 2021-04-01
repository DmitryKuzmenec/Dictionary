import React, {useState} from "react"
import {Redirect, useHistory, useLocation} from "react-router-dom"
import "../css/Login.css"

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState('');
    const [moveTo, setMoveTo] = useState('');

    let history = useHistory();
    let location = useLocation();
    
    let {from} = location.state || {from: {pathname: '/'}}
    
    const showError = err => {
        setError(<div className='Error'>ERROR: {err}</div>);
    }

    const doLogin = async () => {
        try {
            await fetch("/user/signin",{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    passwd: passwd,
                })
            })
            .then((response) => {
                if (! response.ok) {
                    throw new Error('Сервер не доступен');
                }
                return response.json();
            })
            .then((data) => {
                if (data.error && data.error !== "") {
                    throw new Error(data.error);
                }
                history.replace(from);
            })
        }
        catch(error) {
            showError(error.message);
        };
    };

    const toSignup = () => {
        console.log("Before signup: ", from);
        setMoveTo(<Redirect to={{
            pathname: "/signup",
            state:  { from: location.pathname },
        }}/>);
    }
    
    return(
        <>
            {moveTo}
            {error}
            <div className='loginForm'>
                <input type="text" className='loginFormUser' 
                value={email} placeholder="Электронная почта" onChange={e => setEmail(e.target.value)}
            /><br/>
                <input type="text" className='loginFormPasswd' 
                value={passwd} placeholder="Пароль" onChange={e => setPasswd(e.target.value)}
            /><br/>
                <button className='loginFormButton' onClick={doLogin}>Войти</button>
            </div>
            <span className='loginFormAnchor' onClick={toSignup}>Зарегистрироваться</span>
        </>
    )
}