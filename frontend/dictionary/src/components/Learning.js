import React, {useState, useEffect} from 'react'
import NavBar from './NavBar'
import ComposeWord from './learning/ComposeWord'
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import {useHistory} from 'react-router'
import { useLocation } from "react-router-dom"

const countLimit = 2;

export default function Learning(props) {
    const location = useLocation();
    const history = useHistory();

    const words = location.state;
    if (!words) {
        history.goBack();
    }

    const [wordsCounter, setWordsCounter] = useState(0);
    const [counter, setCounter] = useState(0);
    const [visibleCoupleWords, setVisibleCoupleWords] = useState(true);
    const [visibleWord, setVisibleWord] = useState(true);
    const [visibleComposeWord, setVisibleComposeWord] = useState(true);

    const onDoneComposeWord = () => {
        console.log("Done..."+wordsCounter+" : "+counter);

        if (counter <= countLimit) {
            setCounter(counter+1);
        } else {
            setCounter(0);
            if (words.length-1 > wordsCounter) {
                setWordsCounter(wordsCounter+1);
            } else {
                setVisibleComposeWord(false)
            }
        }
    }

    return (
        <div>
            <NavBar page='Изучение слов'/> 
            { visibleCoupleWords &&
                <>
                    <Typography variant="h4" component="h4" >
                        {visibleWord ? words[wordsCounter].word : "*******"}
                        &nbsp; &nbsp;-&nbsp; &nbsp;
                        {words[wordsCounter].translation}
                    </Typography>
                </>
            }
            {visibleComposeWord &&
                <ComposeWord word={words[wordsCounter].word} count={counter} onDone={onDoneComposeWord} />
            }
        </div>
    )
}