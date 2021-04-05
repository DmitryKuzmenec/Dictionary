import React from "react"
import {useDispatch, useSelector} from 'react-redux'
import {Increment, Decrement} from '../actions'

export default function Counter() {
    const count = useSelector(store => store.counter);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => dispatch(Increment())}>+</button>
            <button onClick={() => dispatch(Decrement())}>-</button>
        </div>
    )
}