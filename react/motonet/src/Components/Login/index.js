import React from 'react'
import { connect } from 'react-redux';
import { CircularProgress, Grid, Button, Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Logo from '../../img/MotoNetBR.svg'

const CssTextField = withStyles({
    root: {
        background: "#ffffff33",
        '& .MuiInputBase-root': {
            color: '#fff',
        },
        '& label': {
            color: '#fff',
        },
        '& label.Mui-focused': {
            color: '#000',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#000',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#fff',
            },
            '&:hover fieldset': {
                borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#000',
            },
        },
    },
})(TextField);

const Login = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const [data, setData] = React.useState({
        usr: {
            error: false,
            value: ""
        },
        pass: {
            error: false,
            value: ""
        }
    });

    const onChange = (evt, nombre) => {
        data[nombre].value = evt.currentTarget.value;
        setData({ ...data });
        return <div />;
    }

    if (props.state.usuarioReducer.estado === "error") {
        alert('error, vuelva a escribir');

    }

    if (props.state.usuarioReducer.estado === "exito") {
        props.propsPadre.history.push("/Inicio");
        return <div />
    }
    if (props.state.usuarioReducer.usuarioLog) {
        props.propsPadre.history.push("/Inicio");
        return <div />
    }

    const enviarLoginServe = () => {
        var dataSend = {};
        var exito = true;
        Object.keys(data).map((key) => {
            dataSend[key] = data[key].value;
            if (!data[key].value) {
                data[key].error = true;
                exito = false;
            } else {
                data[key].error = false;
            }
        })
        setData({ ...data });
        if (!exito) {
            return <div />
        }
        var objSend = {
            component: "usuario",
            type: "login",
            estado: "cargando",
            data: dataSend
        };
        props.state.socketReducer.send(objSend);
        return <div />
    }


    return (
        <div className="page colorPrincipal">
            <div className="center">
                <div style={{ display: "block", textAlign: "center", width: "100%" }}>
                    <div style={{ display: "block" }}>
                        <img src={Logo} width={140} alt={"logo"} />
                    </div>
                    <div style={{ display: "block", marginTop: 20, }}>
                        Iniciar como administrador.
                         </div>
                    <div style={{ display: "block", marginTop: 10 }} >
                        <form noValidate autoComplete="off">
                            <CssTextField variant="outlined" label="Usuario" error={data.usr.error} style={{ margin: 8, width: "100%" }} value={data.usr.value} onChange={(evt) => onChange(evt, "usr")} />
                            <CssTextField variant="outlined" label="Password" error={data.pass.error} style={{ margin: 8, width: "100%" }} type="password" value={data.pass.value} onChange={(evt) => onChange(evt, "pass")} onKeyPress={event => {
                                if (event.key == 'Enter') {
                                    console.log('entro la puta madre')
                                    { handleClick() }
                                }
                            }} />
                        </form>

                    </div>
                    <div style={{
                        display: "flex",
                        marginTop: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#000"
                    }}>
                        <Grid container>

                            <Grid xs={12}>
                                <Button variant="contained" size="large" onClick={handleClick}>
                                    {props.state.usuarioReducer.estado == "cargando" ? <CircularProgress color="#fff" style={{ display: "block" }} /> : "Iniciar"}
                                </Button>

                            </Grid>
                            <Grid xs={12}>
                                <Link to={"/Usuario/Recuperar"} style={{ textDecoration: 'none' }}>
                                    <p style={{ color: "#fff", fontSize: 12 }}>Olvidó el Usuario? <b>click aqui para recuperar.</b></p>
                                </Link>

                            </Grid>
                        </Grid>
                    </div>

                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="warning">
                            Error, Datos incorrectos...
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    )

}

function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(Login);
