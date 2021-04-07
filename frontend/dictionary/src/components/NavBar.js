import React, {useState} from 'react'
import {useHistory} from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuList from './NavBarList'
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {getUser,removeToken} from '../util/jwt'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "text.primary",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    empty: {
        flexGrow: 15,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    sectionDesktop: {
        display: 'flex',
    },
    user: {
        fontWeight: 'bold'
    },
}));

export default function NavBar(props) {
    const currentPage = props.page;
    const history = useHistory()
    const user = getUser();
    const classes = useStyles();

    const [drawerState, setDraverState] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logout = () => {
        handleMenuClose();
        removeToken();
        history.push('/signin');
    }
    
    const openDrawer = () => {
        setDraverState(!drawerState);
    }

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          style={{textAlign: "center"}}
        >
          <Typography style={{fontSize: '2.2ex',  fontWeight: 'bold', margin: '5px'}}>
              {user.fName}&nbsp;{user.lName}
          </Typography>
          <Typography style={{ fontSize: '1.5ex',margin: '5px'}}>
              {user.email}
          </Typography>
          <Divider/>
          <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
          <MenuItem onClick={logout}>Выйти</MenuItem>
        </Menu>
    );

    const menuId = 'primary-search-account-menu';
    const anchor = 'left';

    return(
        <React.Fragment>
            <Drawer anchor={anchor} open={drawerState} >
                <MenuList onClose={openDrawer}/>
            </Drawer>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openDrawer}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {currentPage}
                </Typography>
                <div className={classes.empty}/>
                { user.email &&
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                }
                </Toolbar>
            </AppBar>
            {renderMenu}
        </React.Fragment>
    );
}