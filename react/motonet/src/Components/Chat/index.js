import React from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Send from '@material-ui/icons/Send';
import ChatText from '../Chat/ChatText'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

//REFRESCA LA PÁGINA
const ChatPage = (props) => {
    
    const [state, setState] = React.useState({
        listachat: []
    });

    const classes = useStyles();

    //MÉTODO QUE RETORNA TODO EL BLOQUE DINÁMICO DE CHAT (EMISOR/RECEPTOR)
    const getModeloMensaje = (tipo, obj) => {
        var sty = {
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: 8,
            margin: 5,
            padding: "10px 15px 15px 15px",
            background: "#f8d9d9"
        }
        var nameUser = {
            fontSize: 10,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#ff001f",
            paddingBottom: 10
        }
        var iconChat = {
            fontSize: 20,
            top: 5,
            position: "relative"
        }
        if (tipo == "emisor") {
            sty = {
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: 8,
                margin: 5,
                padding: "10px 15px 15px 15px",
                background: "#fff"
            }
            nameUser = {
                fontSize: 10,
                textTransform: "uppercase",
                color: "#4e4c4c",
                paddingBottom: 10,
                fontWeight: 'bold'
            }
        }
        return (
            //lo que retorna con su respectivo estilo
            <div style={sty}>
                <div style={nameUser}>
                    <AccountCircle style={iconChat} /> Nombre-Usuario </div>
                {obj}
            </div>
        )
    }
    return (
        <div >
            <Grid container direction="column">
                <Grid item xs={12}>
                    <div className="chatLinebox2">
                        <div className="nameUser1">
                            Nombre-Usuario <AccountCircle className="iconChat" />
                        </div>Buenas tardes!! MotoNet?
                </div>
                    {
                        //bloque dinámico de chat, reviso si en listachat[] hay mensaje
                        state.listachat.map((obj, key) => {
                            return getModeloMensaje("emisor", obj)
                        })
                    }
                </Grid>
            </Grid>
            <ChatText />
        </div>
    )
}
export default connect()(ChatPage);