import { Button, CircularProgress, Grid } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux';
import SS_alert from '../Servisofts/SS_alert';
import SS_input from '../Servisofts/SS_input';


var cabecera = "registro_administrador";
const UsuarioRegistro = (props) => {
    const [objValores, setObjValores] = React.useState({});
    const [objErrores, setObjErrores] = React.useState({});

    if (!props.state.cabeceraDatosReducer.data[cabecera]) {
        if (!props.state.socketReducer.socket) {
            return (
                <div>No hay coneccion con el socket</div>
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
    const getLista = () => {

        return datosCabecera.map((obj, key) => {
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
            return (
                <SS_alert
                    titulo={"Nuevo usuario registrado"}
                    mensaje={"Nuevo usuario registrado con éxito. Presione ver para ir a el perfil."}
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
                        props.history.push("/ListaUsuario");
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
        return (
            <Button className="secondary txtBlanco" variant="contained" onClick={() => {
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
              
                {getLista()}
                <Grid xs={12}
                    container
                    justify="center"
                    style={{ marginTop: 20 }}
                >
                    {getButtonCrear()}
                </Grid>
            </Grid>
        </Grid>
    )

}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(UsuarioRegistro);