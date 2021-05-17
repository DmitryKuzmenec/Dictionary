import React, {useState} from 'react'
import NavBar from './NavBar'
import ComposeWord from './learning/ComposeWord'
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const countLimit = 2;

export default function Learning(props) {

    const words = [
        {w: "window", t: "окно"}, 
        {w: "table",  t: "стол"},
        {w: "mouse",  t: "мышь"},
        {w: "pen",    t: "ручка"}
    ];

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
                        {visibleWord ? words[wordsCounter].w : "*******"}
                        &nbsp; &nbsp;-&nbsp; &nbsp;
                        {words[wordsCounter].t}
                    </Typography>
                </>
            }
            {visibleComposeWord &&
                <ComposeWord word={words[wordsCounter].w} count={counter} onDone={onDoneComposeWord} />
            }
        </div>
    )
}