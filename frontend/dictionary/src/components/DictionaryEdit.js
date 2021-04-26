import React, {useState, useEffect} from 'react'
import NavBar from './NavBar'
import { useLocation } from "react-router-dom"
import {useHistory} from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import WordsList from './WordsList'
import Pager from './Pager'
import {AddWord, RemoveWord, GetWords} from '../util/dictionary'

const useStyles = makeStyles((theme) => ({
    addNewWordForm: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        },
    },
    title: {
        justifyContent: "center",
        fontWeight: "bold",
        fontStyle: "italic",
        width: "100%",
    },
    formField: {
        width: theme.spacing(30),
        marginBottom: theme.spacing(3),
    },
    button: {
        marginBottom: theme.spacing(3),
    }
}));
  
export default function DictionaryEdit() {
    const location = useLocation();
    const history = useHistory();
    const pageLimit = 5;

    const dictionary = location.state;
    if (!dictionary) {
        history.push('/dictionaries');
    }
    
    const classes = useStyles();
    const [foreign, setForeign] = useState('');
    const [translate, setTranslate] = useState('');
    const [trscr, setTrscr] = useState('');
    const [words, setWords] = useState([]);
    const [total, setTotal] = useState(dictionary.total);
    const [page, setPage] = useState(1);

    useEffect(() => {
        try {
            GetWords(dictionary.id).then((words) => {
            console.log("WORDS: ",words);
            if(words) {
                setWords(words);
            }
        })
        } 
        catch(e) {
            console.log("ERROR: ", e)
        }
    }, []);


    const addNewWord = () => {
        const newWord = {
            word: foreign,
            translation: translate,
            transcription: trscr,
        };

        try{ AddWord(newWord, dictionary.id).then(() => {
              setWords(words.concat([newWord]));
              setTotal(total + 1);
              setForeign('');
              setTranslate('');
              setTrscr('');
          })
        } catch(e) {
          console.log("ERROR: ", e)
        }
    }

    const removeWord = (word) => {
        console.log("Remove: ", word)

        try{ RemoveWord(dictionary.id, word.id).then(() => {
            setWords(words.filter(w => w.id != word.id));
            setTotal(total - 1);
        })
      } catch(e) {
        console.log("ERROR: ", e)
      }
    }

    const editWord = (word) => {
        console.log("Edit: ", word)
    }

    const pageBack = () => {
        console.log("pageBack")
    }

    const pageForward = () => {
        console.log("pageForward")
    }

    return (
        <>
            <NavBar page={`Словарь «${dictionary.name}»`}/>
            <br/><br/>
            <div className={classes.addNewWordForm}>
                <Typography align={"center"} className={classes.title} color={"primary"}>Добавление новых слов</Typography>
                <TextField className={classes.formField} label="Слово" value={foreign} onChange={(e) => setForeign(e.target.value)}/>
                <TextField className={classes.formField} label="Перевод" value={translate} onChange={(e) => setTranslate(e.target.value)}/>
                <TextField className={classes.formField} label="Транскрипция" value={trscr} onChange={(e) => setTrscr(e.target.value)}/>
                <Button className={classes.button} variant="outlined" color="primary" onClick={addNewWord}>Добавить</Button>
            </div>
            <br/>
            <WordsList words={words} edit={editWord} remove={removeWord} />
            <Pager forward={pageForward} back={pageBack}/>
        </>
    )
}