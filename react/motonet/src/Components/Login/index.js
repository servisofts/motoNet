import React from 'react'
import { connect } from 'react-redux';
import { CircularProgress, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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


    const errorLogin = () => {
 
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
                                    { enviarLoginServe() }
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
                                <Button variant="contained" size="large" onClick={enviarLoginServe}>
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
                </div>
            </div>
        </div>
    )

}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(Login);
