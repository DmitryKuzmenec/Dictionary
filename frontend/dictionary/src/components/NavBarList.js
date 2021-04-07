import React from 'react'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router'

export default function MenuList(props) {
    const closeList = props.onClose;
    const history = useHistory();

    const Home = () => {
        closeList();
        history.push('/home');
    }

    const Dictionaries = () => {
        closeList();
        history.push('/dictionaries');
    }
    const Learning = () => {
        closeList();
        history.push('/learning');
    }
    const Exam = () => {
        closeList();
        history.push('/exam');
    }

    return (
        <div onClick={closeList}style={{height: '100vh'}}>
            <Typography variant="h5" gutterBottom align="center">
                :)
            </Typography>
            <Divider />
            <List>
                <ListItem button key='home' onClick={Home}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Главная' />
                </ListItem>
                <ListItem button key='Dicteonaries' onClick={Dictionaries}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Словари' />
                </ListItem>
                <ListItem button key='Learning' onClick={Learning}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Изучение слов' />
                </ListItem>
                <ListItem button key='Exam' onClick={Exam}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Экзамен' />
                </ListItem>
            </List>
            <Divider />
        </div>
    )
}