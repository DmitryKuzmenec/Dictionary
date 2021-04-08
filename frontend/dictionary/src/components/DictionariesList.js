import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {getUser} from '../util/jwt'

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
  
  },
);


export default function DictionariesList() {
  const user = getUser();
  const classes = useStyles();
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [counter, setCounter] = useState(0);

  useEffect(async () => {
    try {
      await fetch("/dictionary/groups/list/"+user.id,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (! response.ok) {
          throw new Error('Сервер не доступен');
        }
        return response.json();
      }).then((groups) => {
        console.log(groups);
        if(groups) {
          setGroups(groups);
        }
      })
    } 
    catch(e) {
      console.log("ERROR: ", e)
    }
  }, [counter])
  
  const changeGroupName = (e) => {
    setGroupName(e.target.value)
  }
  
  const addNewGroup = async () => {
    try{
      await fetch("/dictionary/groups/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: user.id,
          name: groupName,
        })
      }).then((response) => {
        if (! response.ok) {
          throw new Error('Сервер не доступен');
        }
        return response.json();
      }).then((groups) => {
        setGroupName('');
        setCounter(counter+1);
      })
    } catch(e) {
      console.log("ERROR: ", e)
    }
  }

  return (
    <React.Fragment>
      
      <Grid container direction="row" justify="flex-end" alignItems="flex-end">
          <TextField id="standard-basic" label="Название нового словаря" className={classes.textField} onChange={changeGroupName}/>
          <Button variant="outlined" color="primary" onClick={addNewGroup}>Создать</Button>
      </Grid>
      <br/>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="dictionaries table">
        <TableHead>
          <TableRow>
            <TableCell>Словарь</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right">Количество слов</TableCell>
            <TableCell align="right">Выучено</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            { groups.length > 0 &&
              groups.map((group) => (
                  <TableRow key={group.groupID}>
                    <TableCell component="th" scope="row">{group.name}</TableCell>
                    <TableCell align="right">{group.status}</TableCell>
                    <TableCell align="right">{group.total}</TableCell>
                    <TableCell align="right">{group.done}</TableCell>
                  </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}