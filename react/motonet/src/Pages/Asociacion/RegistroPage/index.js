import React from 'react'
import { connect } from 'react-redux';
import NaviDrawer from '../../../Components/NaviDrawer';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableNewMe from '../../../Components/TableNewMe'
import Page from '../../../Components/Page';


const RegistroPage = (props) => {
    const getLista = () => {
        var list = [];
        var data = props.state.asociacionMotoReducer.data;
        Object.keys(data).map((key) => {
            var obj = data[key];
            console.log(obj);
            list.push({
                //las variables son las mismas que se llama de las tablas
                key,
                UsuarioResponsable: { dato: obj.key_encargado },
                Descripcion: { dato: obj.descripcion },
                Direccion: { dato: obj.direccion }
            })
        })

        return list;
    }

    if (!props.state.socketReducer.socket) {
        return <div style={{ color: "#000" }}>cargandoo</div>
    }

    if (props.state.asociacionMotoReducer.estado == "cargando") {
        return <div>cargando1</div>
    }
    if (props.state.asociacionMotoReducer.estado == "error") {
        return <div>{props.state.asociacionMotoReducer.error}</div>
    }
    if (!props.state.asociacionMotoReducer.data) {
        var objSend = {
            component: "asociacionMoto",
            type: "getAll",
            estado: "cargando",
            data: ""
        };
        props.state.socketReducer.send(objSend);
        return <div />
    }
    return (
        <Page
            history={props.history}
            title={"Asociaciones"}
            onBack={"/Inicio"}
        >
            <Grid container direction="row">
                <Grid item xs={12}  >
                    <TableNewMe
                        title={"Lista de Asociaciones"}
                        head={[
                            { id: 'UsuarioResponsable', label: 'Responsable' },
                            { id: 'Descripcion', label: 'Descripcion' },
                            { id: 'Direccion', label: 'Direccion' },
                        ]}
                        order={{
                            key: "UsuarioResponsable",
                            dir: "desc"
                        }}
                        data={getLista()}
                        onAdd={(evt) => {
                            props.history.push("/AsociacionesMotoPage")
                        }}
                    />
                </Grid>
            </Grid>
        </Page>
    )

}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(RegistroPage);
