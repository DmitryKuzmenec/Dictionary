import Counter from './counter'
import {combineReducers} from 'redux'

const Reducer = combineReducers({
    counter: Counter
})

export default Reducer