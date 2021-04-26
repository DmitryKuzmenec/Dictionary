import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';


const useStyles = makeStyles({
    warningIcone: {
        fontSize: '1.7em',
    },
});

export default function WarningDialog(props) {
    const styles = useStyles();
    const message = props.message;
    const onAgreed = props.onAgreed;
    const onDisagreed = props.onDisagreed;
    const isOpen = props.open;
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        setOpen(isOpen);
    })

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseAgreed = () => {
        onAgreed();
    }

    const handleCloseDisagreed = () => {
        onDisagreed();
    }

    return (
        <>
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
          <Grid container direction="row" justify="center" alignItems="flex-end">
            <ReportProblemOutlinedIcon className={styles.warningIcone} color="secondary"/>{"Внимание!"}
          </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAgreed} color="primary" >
          Согласен
        </Button>
        <Button onClick={handleCloseDisagreed} color="secondary" autoFocus>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
    </>
    )

} 