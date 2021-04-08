import React from 'react'
import NavBar from './NavBar'
import DictionariesList from './DictionariesList'
import Typography from '@material-ui/core/Typography';

export default function Dictionaries() {
    return (
        <div>
            <NavBar page='Словари'/>
            <br/><br/>
            <DictionariesList/>
        </div>
    )
}