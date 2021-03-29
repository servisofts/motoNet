import { Button, CircularProgress, Grid } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux';
import TableNewMe2 from '../../../TableNewMe2'

const DP_Doctores_popup = (props) => {

    if (!props.isVisible) {
        return <div />
    }

    if (!props.state.doctorReducer.data) {
        if (!props.state.socketReducer.socket) {
            return <CircularProgress gress color="#fff" style={{ display: "block" }} />
        }
        if (props.state.doctorReducer.estado == "cargando") {
            return <CircularProgress color="#fff" style={{ display: "block" }} />
        }
        if (props.state.doctorReducer.estado == "error") {
            return <div>{props.state.doctorReducer.error}</div>
        }
        var objSend = {
            component: "usuario",
            type: "getAllCabecera",
            estado: "cargando",
            cabecera: "registro_doctor",
            data: ""
        };
        props.state.socketReducer.send(objSend);
        return <CircularProgress color="#fff" style={{ display: "block" }} />
    }

    const getLista = () => {
        var list = [];
        var data = props.state.doctorReducer.data;
        Object.keys(data).map((key) => {
            var obj = data[key];
            if(props.state.secretariaDoctorReducer.data[props.secretaria.key][key]){
                return;
            }
            console.log(obj);
            list.push({
                key,
                nombre: obj.data["Nombres"].dato,
                descripcion: obj.data["Apellidos"].dato,
            })
        })
        return list;
    }

    return (
        <Grid style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "#00000066",
            zIndex: 999999,
            overflow: "auto"
        }}
            onClick={() => {
                props.onClose(false)
                return <div />
            }}
            container justify="center" alignItems="center">

            <Grid justify="center" alignItems="center" xs={10}
                style={{
                    border: "1px solid",
                    background: "#fff",
                    padding: 20,
                    borderRadius: 20,
                    overflow: "auto"
                }}
                onClick={(evt) => {
                    evt.stopPropagation()
                    return false;
                }}
            >
                <Grid style={{ paddingTop: 7 }}>
                    <TableNewMe2
                        head={[
                            { id: 'nombre', label: 'Nombre' },
                            { id: 'descripcion', label: 'Descripción' },
                        ]}
                        data={getLista()}
                        onAdd={(evt) => {
                            props.history.push("/RegistroEspecialidadPage")
                        }}
                        handleClick={
                            (key) => {
                                var objSend = {
                                    component: "secretariaDoctor",
                                    type: "registro",
                                    estado: "cargando",
                                    key_secretaria: props.secretaria.key,
                                    key_doctor: key,
                                    key_usuario: "sad1hasgd"
                                }
                                props.state.socketReducer.send(objSend)
                                return;
                            }
                        }

                    />
                </Grid>
            </Grid>
        </Grid>

    )

}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(DP_Doctores_popup);