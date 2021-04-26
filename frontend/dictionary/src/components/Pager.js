import React from "react"
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Grid from '@material-ui/core/Grid';

export default function Pager(props) {
    const pageBack = props.back;
    const pageForward = props.forward;

    return (
        <Grid container spacing={3} direction="row" justify="space-around" alignItems="center">
            <Grid item xs={4}>
                <IconButton aria-label="back" color="primary" onClick={pageBack}>
                    <ArrowBackIosIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={4}>
                <MoreHorizIcon color="primary"/>
            </Grid>
            <Grid item xs={4}>
                <IconButton aria-label="forward" color="primary" onClick={pageForward}>
                    <ArrowForwardIosIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
}