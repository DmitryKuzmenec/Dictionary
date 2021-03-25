import React, {useState} from "react"
import {Redirect} from "react-router-dom"
import "../css/Login.css"

export default function Login(props) {
    let next = props.next;
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState('');
    const [signup, setSignup] = useState('');

    const showError = err => {
        setError(<div className='Error'>ERROR: {err}</div>);
    }
    const hideError = () => {
        setError('');
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
                hideError();
                setPasswd('');
            })
        }
        catch(error) {
            showError(error.message);
        };
    };

    const toSignup = () => {
        setSignup(<Redirect to='/signup'/>);
    }

    return(
        <>
        {signup}
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