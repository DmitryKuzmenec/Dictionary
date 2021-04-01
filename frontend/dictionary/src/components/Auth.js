import React, {useEffect, useState} from "react"
import {Redirect, useLocation} from "react-router-dom";

export default function Auth(props) {
    const [next, setNext] = useState(null);
    let location = useLocation();

    useEffect( () => {
        let mounted = true;
        fetch("/user/jwt", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if(mounted) {
                if (! response.ok) {
                    setNext(<Redirect to={{
                        pathname: "/login",
                        state: { from: location.pathname }
                    }}/>)
                } else {
                    setNext(React.createElement(props.next,{}))
                }
            }
        })
        return () => mounted = false;
    },[]);
    
    return (
        <>
        {next}
        </>
    )
}