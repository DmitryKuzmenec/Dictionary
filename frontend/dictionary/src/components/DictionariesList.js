import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import {useHistory} from 'react-router'
import WarningDialog from './WarningDialog'
import {getUser} from '../util/jwt'
import {GetDictionariesList, RemoveDictionary, CreateDictionary} from '../util/dictionary'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  empty: {
    flexGrow: 2,
  },
  newDictionary: {
    flexGrow: 5,
    alignItems: 'flex-end',
    marginBottom: '30px',
  },
  textField: {
       maxWidth: '40ch',
       marginRight: '10px',
       flexGrow: 1,
    },
  removeDictionary: {
    cursor: 'pointer',
  }
});


export default function DictionariesList() {
  const user = getUser();
  const history = useHistory();
  const classes = useStyles();
  const [dictionaries, setDictionaries] = useState([]);
  const [dictionaryName, setDictionaryName] = useState('');
  const [openWarning, setOpenWarning] = useState(false);
  const [deleteDictionaryID, setDeleteDictionaryID] = useState(0);

  console.log(dictionaries);

  useEffect(() => {
    try {
      GetDictionariesList().then((dictionaries) => {
        if(dictionaries) {
          setDictionaries(dictionaries);
        }
      })
    } 
    catch(e) {
      console.log("[GetDictionariesList] error: ", e)
    }
  }, [])
  
  const changeDictionaryName = (e) => {
    setDictionaryName(e.target.value)
  }
  
  const addNewDictionary = () => {
    try{
      CreateDictionary(dictionaryName).then((d) => {
        console.log(d);
        const newDictionaries = dictionaries
        newDictionaries.push(d);
        setDictionaries(newDictionaries);
        setDictionaryName('');
      })
    } catch(e) {
      console.log("ERROR: ", e)
    }
  }

  const deleteDictionary = (e, dictionaryID) => {
    setDeleteDictionaryID(dictionaryID);
    setOpenWarning(true);
  }

  const doDeleteDictionary = (id) => {
    try{
      RemoveDictionary(id).then(() =>{
        setDictionaries(dictionaries.filter(d => d.id !== id))
        setOpenWarning(false)
      })
    } catch(e) {
      console.log("ERROR: ", e)
    }
  }
  
  const editDictionary = (e, dictionary) => {
    history.push({
      pathname: '/dictionaries/edit',
      state: dictionary
    })
  }

  return (
    <React.Fragment>
      
      <Grid container direction="row" justify="flex-end" alignItems="flex-end">
          <TextField id="standard-basic" label="Название нового словаря" className={classes.textField} value={dictionaryName} onChange={changeDictionaryName}/>
          <Button variant="outlined" color="primary" onClick={addNewDictionary}>Создать</Button>
      </Grid>
      <br/>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="dictionaries table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Словарь</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right">Количество слов</TableCell>
            <TableCell align="right">Выучено</TableCell>
            <TableCell align="center">Редактировать</TableCell>
            <TableCell align="center">Удалить</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            { dictionaries.length > 0 &&
              dictionaries.map((dictionary) => (
                  <TableRow key={dictionary.id} id={dictionary.id}>
                    <TableCell align="left">{dictionary.name}</TableCell>
                    <TableCell align="right">{dictionary.status}</TableCell>
                    <TableCell align="right">{dictionary.total}</TableCell>
                    <TableCell align="right">{dictionary.done}</TableCell>
                    <TableCell align="center">
                      <div onClick={(e) => editDictionary(e, dictionary)}>
                        <PlaylistAddIcon className={classes.removeDictionary} color="secondary"/>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div onClick={(e) => deleteDictionary(e, dictionary.id)}>
                        <HighlightOffIcon className={classes.removeDictionary} color="secondary"/>
                      </div>
                    </TableCell>
                  </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <WarningDialog
        open={openWarning}
        message={"Удаление словаря"} 
        onAgreed={() => doDeleteDictionary(deleteDictionaryID)} 
        onDisagreed={()=>{setOpenWarning(false)}}
      />
    </React.Fragment>
  )
}