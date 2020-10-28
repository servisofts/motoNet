import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { makeStyles } from '@material-ui/core/styles';
import "./index.css";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));

//REFRESCA LA PÁGINA
const ChatText = (props) => {
    

    return (
        <div style={{ width: "100%", position: "absolute", bottom: 0 }}>
            <Grid container direction="row">
                <Grid item xs={10}>
                    <TextField style={{ width: "100%" }} id="descripcionLabel" label="Escribe un mensaje aquí" />
                </Grid>
                <Grid item xs={2}>
                    <Button className="btnChat" variant="contained" color="secondary" onClick={() => {
                        var descr = document.getElementById("descripcionLabel").value;
                        if (descr != "") {
                            state.listachat.push(descr)
                            setState({ ...state })
                            document.getElementById("descripcionLabel").value = "";
                        }
                    }}>
                        
                        <Send />
                    </Button>
                </Grid>
            </Grid>


        </div>
    )
}

export default ChatText;
