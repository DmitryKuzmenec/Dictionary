import React, {useEffect, useState} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const useStyles = makeStyles({
    title: {
        //fontStyle: "italic",
    },
    table: {
      minWidth: 650,
    },
    empty: {
      flexGrow: 2,
    },
    textField: {
         maxWidth: '40ch',
         marginRight: '10px',
         flexGrow: 1,
    },
    removeWord: {
      cursor: 'pointer',
    },
    editWord:  {
        cursor: 'pointer',
      }
  });

export default function WordsList(props) {
    const words = props.words;
    const remove = props.remove;
    const edit = props.edit;

    console.log("Words: ",words);

    const classes = useStyles();

    const editWord = (e, word) => {
        edit(word);
    }

    const removeWord = (e, word) => {
        remove(word);
    }

    const handleChange = (page) => {
        console.log(page)
    }

    return (
        <>
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="dictionaries table">
                <TableHead>
                <TableRow>
                    <TableCell align="center" className={classes.title}>Слово</TableCell>
                    <TableCell align="center" className={classes.title}>Транскрипция</TableCell>
                    <TableCell align="center" className={classes.title}>Перевод</TableCell>
                    <TableCell align="center" className={classes.title}>Выучено</TableCell>
                    <TableCell align="center" className={classes.title}>Изменить</TableCell>
                    <TableCell align="center" className={classes.title}>Удалить</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {words && words.map((w) => (
                        <TableRow key={w.id} id={w.id}>
                            <TableCell align="center">{w.word}</TableCell>
                            <TableCell align="center">{w.transcription}</TableCell>
                            <TableCell align="center">{w.translation}</TableCell>
                            <TableCell align="center">{w.status}</TableCell>
                            <TableCell align="center">
                                <div onClick={(e) => editWord(e, w)}>
                                    <PlaylistAddIcon className={classes.editWord} color="secondary"/>
                                </div>
                            </TableCell>
                            <TableCell align="center">
                                <div onClick={(e) => removeWord(e, w)}>
                                    <HighlightOffIcon className={classes.removeWord} color="secondary"/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}