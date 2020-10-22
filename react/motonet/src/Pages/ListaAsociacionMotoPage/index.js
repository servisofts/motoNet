import React from 'react'
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import { Grid } from '@material-ui/core';
import TableDetail from '../../Components/Table';




const ListaAsociacionMotoPage = (props) => {

    const getLista = () => {

        var list = [];
        var data = props.state.asociacionMotoReducer.data;
        Object.keys(data).map((key) => {
            var obj = data[key];
            console.log(obj);
            list.push({
                key,
                Usuario_Responsable: obj.Usuario_Responsable,
                NombreAsociacion: obj.NombreAsociacion,
                Direccion: obj.Direccion,
            })
        })

        return list;
    }



    return (
        <NaviDrawer title={"Lista Asociacion de Mototaxistas"} history={props.history}
            page={() => {
                if (!props.state.socketReducer.socket) {
                    return <div style={{ color: "#000" }}>cargando</div>
                }

                if (props.state.asociacionMotoReducer.estado == "cargando") {
                    return <div>cargando</div>
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
                    <Grid container direction="row">
                        <Grid item xs={12} spacing={2} >
                            <TableDetail
                                head={[
                                    { id: 'UsuarioResponsable', label: 'Responsable' },
                                    { id: 'NombreAsociacion', label: 'Nombre Asociacion' },
                                    { id: 'Direccion', label: 'Direccion' },
                                ]}
                                data={getLista()}
                                onAdd={(evt) => {
                                    props.history.push("/Usuario/Registro")
                                }}
                                handleClick={
                                    (key) => {
                                        props.changeSelectDato(key);
                                        return;
                                    }
                                }
                            />
                        </Grid>

                    </Grid>
                )
            }}
        />
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ListaAsociacionMotoPage);
