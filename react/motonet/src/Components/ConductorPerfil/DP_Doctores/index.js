import { Button, CircularProgress, Grid } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux';
import TableNewMe2 from '../../TableNewMe2'
import DP_Doctores_popup from './DP_Doctores_popup';

const DP_Doctores = (props) => {
    const [visible, setVisible] = React.useState(false);
    if (!props.state.doctorReducer.data) {
        if (!props.state.socketReducer.socket) {
            return <CircularProgress color="#fff" style={{ display: "block" }} />
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

    if (!props.state.secretariaDoctorReducer.data[props.secretaria.key]) {
        if (!props.state.socketReducer.socket) {
            return <CircularProgress color="#fff" style={{ display: "block" }} />
        }
        if (props.state.secretariaDoctorReducer.estado == "cargando") {
            return <CircularProgress color="#fff" style={{ display: "block" }} />
        }
        if (props.state.secretariaDoctorReducer.estado == "error") {
            return <div>{props.state.secretariaDoctorReducer.error}</div>
        }
        var objSend = {
            component: "secretariaDoctor",
            type: "getAllByKeySecretaria",
            estado: "cargando",
            key_secretaria: props.secretaria.key,
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
            if (!props.state.secretariaDoctorReducer.data[props.secretaria.key][key]) {
                return;
            }
            list.push({
                key,
                nombre: obj.data["Nombres"].dato,
                apellido: obj.data["Apellidos"].dato,
            })
        })
        return list;
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center" xs={12}
            style={{
                // border: "3px solid #ccc"
            }}
        >
            <Grid style={{ paddingTop: 7 }}>
                <TableNewMe2
                    title={"Doctores"}
                    head={[
                        { id: 'nombre', label: 'Nombre' },
                        { id: 'apellido', label: 'Apellido' },
                    ]}
                    data={getLista()}
                    onAdd={(evt) => {
                        setVisible(true)
                    }}
                />
            </Grid>
            <DP_Doctores_popup secretaria={props.secretaria} isVisible={visible} onClose={setVisible} history={props.history} />
        </Grid>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(DP_Doctores);