import React, {useState} from "react"
import {Redirect, useHistory, useLocation} from "react-router-dom"
import '../css/Signup.css'


export default function Signup() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [passwd1, setPasswd1] = useState('');
    const [passwd2, setPasswd2] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [moveTo, setMoveTo] = useState('');
    
    const history = useHistory();
    const location = useLocation();

    const {from} = location.state || {from: {pathname: '/'}};
    
    const showError = err => {
        setError(<div className='Error'>ERROR: {err}</div>);
    }

    const doSignup = () => {
        try {
            fetch("/user/signup",{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fName: fname,
                    lName: lname,
                    email: email,
                    passwd: passwd1,
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
                console.log("Replace to: ",from );
                toLogin();
            })
        }
        catch(error) {
            showError(error.message);
        };
    }

    const toLogin = () => {
        console.log("Before login: ", from);
        setMoveTo(<Redirect to={{
            pathname: "/login",
            state:  { from: location.pathname },
        }}/>);
    }

    return(
        <>
        {moveTo}
        {error}
        <div className='SignupForm'>
            <input 
                className='SignupFormInputText' type='text' 
                value={fname} onChange={e => setFname(e.target.value)} 
                placeholder='Имя'
            /><br/>
            <input 
                className='SignupFormInputText' type='text' 
                value={lname} onChange={e => setLname(e.target.value)} 
                placeholder='Фамилия'
            /><br/>
            <input 
                className='SignupFormInputText' type='text' 
                value={email} onChange={e => setEmail(e.target.value)} 
                placeholder='Электронная почта'
            /><br/>
            <input 
                className='SignupFormInputText' type='password' 
                value={passwd1} onChange={e => setPasswd1(e.target.value)} 
                placeholder='Пароль'
            /><br/>
            <input 
                className={`SignupFormInputText ${passwd1 === passwd2 ? '' : 'WrongField'}`} type='password' 
                value={passwd2} onChange={e => setPasswd2(e.target.value)} 
                placeholder='Повтор пароля'
            /><br/>
            <button className='SignupFormButton' disabled={passwd1 !== passwd2} onClick={doSignup}>Зарегистрироваться</button>
        </div>
        </>
    )
}