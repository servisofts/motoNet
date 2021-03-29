import { Button, CircularProgress, Grid } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux';
import SS_alert from '../Servisofts/SS_alert';
import SS_input from '../Servisofts/SS_input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


var cabecera = "registro_conductor";
const ConductorRegistro = (props) => {
    const [objValores, setObjValores] = React.useState({});
    const [objErrores, setObjErrores] = React.useState({});
    const [Accion, setAccion] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [objValoresCheck, setObjValoresCheck] = React.useState({});
    const [objErroresCheck, setObjErroresCheck] = React.useState({});


    if (!props.state.cabeceraDatosReducer.data[cabecera]) {
        if (!props.state.socketReducer.socket) {
            return (
                <div>No hay conexión con el socket</div>
            )
        }
        if (props.state.cabeceraDatosReducer.estado == "cargando") {
            return <div>Cargando</div>
        }
        var objSend = {
            component: "cabeceraDato",
            type: "getDatoCabecera",
            estado: "cargando",
            cabecera: cabecera
        }
        props.state.socketReducer.send(objSend)
        return (
            <div>No hay cabecera</div>
        )
    }

    var datosCabecera = props.state.cabeceraDatosReducer.data[cabecera];

    if (!Accion) {
        if (props.key_usuario) {
            var conductor = "";
            if (props.state.conductorReducer.data[props.key_usuario]) {
                conductor = props.state.conductorReducer.data[props.key_usuario];
            }
            var objChange = {};
            datosCabecera.map((obj, key) => {
                objChange[key] = (!conductor.data[obj.dato.descripcion] ? "" : conductor.data[obj.dato.descripcion].dato);
            })
            setObjValores({ ...objChange });
            setAccion("Editar")
            return <div />
        } else if (!props.key_usuario) {
            setAccion("Crear")
        }
    }

    if (props.state.conductorReducer.estado == "exito" && props.state.conductorReducer.type == "insertarDato") {
        handleClickOpen()
        props.state.conductorReducer.estado = false
    }

    const getLista = () => {
        return datosCabecera.map((obj, key) => {
            if (obj.dato.descripcion == "Facebook key") {
                return <div />
            }
            return (
                <Grid xs={12}>
                    <SS_input
                        data={obj}
                        style={{
                            width: "100%"
                        }}
                        value={objValores[key]}
                        error={objErrores[key]}
                        onChange={(elm) => {
                            var texto = elm.currentTarget.value;
                            objValores[key] = texto;
                            setObjValores({ ...objValores });
                            return <div></div>
                        }} />
                </Grid>

            )
        })
    }
    const getButtonCrear = () => {
        if (props.state.usuarioReducer.type == "registro"
            && props.state.usuarioReducer.estado == "exito") {
            var usr = props.state.usuarioReducer.registrado;

            return (
                <SS_alert
                    titulo={"Nuevo conductor registrado"}
                    mensaje={"Nuevo conductor registrado con éxito. Presione ver para ir a el perfil."}
                    onClose={() => {
                        props.dispatch({
                            component: "usuario",
                            type: "registro",
                            estado: ""
                        })
                    }}
                    onConfirm={() => {
                        props.dispatch({
                            component: "usuario",
                            type: "registro",
                            estado: ""
                        })
                        props.history.push("/ConductorPerfilPage/" + usr.key_usuario);
                    }}
                />
            )
        }
        if (props.state.usuarioReducer.estado == "cargando") {
            return <CircularProgress color="#fff" style={{ display: "block" }} />
        }
        if (props.state.usuarioReducer.estado == "error") {
            alert(props.state.usuarioReducer.error)
            props.dispatch({
                component: "usuario",
                type: "registro",
                estado: ""
            })
        }

        if (Accion == "Crear") {
            return (
                <Button variant="contained" className="secondary txtBlanco" onClick={() => {
                    var error = false;
                    var arrDatos = [];
                    datosCabecera.map((obj, key) => {
                        if (!objValores[key]) {
                            if (obj.dato.requerido) {
                                objErrores[key] = true;
                                error = true;
                            }
                        } else {
                            objErrores[key] = false;
                            arrDatos.push({
                                dato: obj,
                                data: objValores[key]
                            })
                        }
                    });
                    setObjErrores({ ...objErrores })

                    if (!error) {
                        console.log(objSend);
                        var objSend = {
                            component: "usuario",
                            type: "registro",
                            estado: "cargando",
                            cabecera: cabecera,
                            data: arrDatos
                        }
                        props.state.socketReducer.send(objSend)
                    }

                }}>
                    crear
                </Button>
            )
        } else if (Accion == "Editar") {
            return (
                <Button variant="contained" className="secondary txtBlanco" onClick={() => {
                    var error = false;
                    var arrDatos = [];
                    datosCabecera.map((obj, key) => {
                        if (!objValores[key]) {
                            if (obj.dato.requerido) {
                                objErrores[key] = true;
                                error = true;
                            }
                        } else {
                            objErrores[key] = false;
                            arrDatos.push({
                                dato: obj,
                                data: objValores[key]
                            })
                        }
                    });
                    setObjErrores({ ...objErrores })

                    if (!error) {
                        // console.log(objSend);
                        var objSend = {
                            component: "usuario",
                            type: "insertarDato",
                            estado: "cargando",
                            cabecera: cabecera,
                            data: arrDatos,
                            key_usuario: props.key_usuario
                        }
                        props.state.socketReducer.send(objSend)
                    }
                }}>
                    EDITAR
                </Button>
            )
        }
    }


    const getFotoPerfil = () => {
        return (
            <div style={{
                display: "flex"
            }}>
                <div style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                    border: "3px solid #CCC "
                }}>

                    <div style={{
                        position: "relative",
                        top: 100,
                        left: 100,
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        border: "3px solid #CCC ",
                        background: "#CCC"
                    }}>

                    </div>
                </div>

            </div>

        )
    }
    return (
        <Grid
            container
            justify="center"
            xs={12}
        >
            <Grid
                container
                justify="center"
                xs={12}
                md={8}
            >
                {getFotoPerfil()}
                {getLista()}
                {/* <TipoConsulta_CheckBock onChange={(obj, key) => {
                    //alert(obj)
                    setObjValoresCheck(obj)
                    //alert(objValoresCheck[key])
                }} /> */}


                <Grid xs={8}
                    container
                    justify="center"
                    style={{ marginTop: 20 }}
                >
                    {getButtonCrear()}
                </Grid>
            </Grid>

            {props.state.conductorReducer.estado == "cargando" && props.state.conductorReducer.type == "insertarDato" ?
                <div style={{
                    width: "100%",
                    left: "0%",
                    height: "80vh",
                    position: "fixed",
                    top: "10vh",
                    background: "#ffffff99",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    display: "flex",
                }}>
                    <CircularProgress size={40} color="#000"
                        style={{
                        }} />
                </div>
                : <div />
            }

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ color: "#42D733" }} id="alert-dialog-title">{"EXITO"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Los datos fueron editados exitosamente!
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        OK
          </Button>
                </DialogActions>
            </Dialog>

        </Grid>
    )

}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ConductorRegistro);