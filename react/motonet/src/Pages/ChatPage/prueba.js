import React from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as  tipoTarifaViajeActions from '../../Actions/tipoTarifaViaje';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));

const ChatPage = (props) => {
    const [state, setState] = React.useState({
        listachat: []
    });

    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12}>
                {
                    state.listachat.map((obj, key) => {
                        return <div>{obj}</div>
                    })
                }
            </Grid>
                <Grid item xs={12}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="descripcionLabel" label="Escribe un mensaje aquí" />
                        <Button variant="contained" color="secondary" onClick={() => {
                            var descr = document.getElementById("descripcionLabel").value;
                            state.listachat.push(descr)
                            setState({ ...state })
                            

                        }}>
                            ENVIAR
                                </Button>
                    </form>

                </Grid>
        </Grid>
    )
}

const initStates = (state) => {
    return { state }
};
const initActions = {
    ...tipoTarifaViajeActions
};
export default connect(initStates, initActions)(ChatPage);