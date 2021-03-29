//libs
import React from 'react';
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import TableNewMe from '../../Components/TableNewMe';
import { CircularProgress, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
//import PerfilUsuario from '../../Components/PerfilUsuario'
import * as  cargarDatosPersonalesActions from '../../Actions/cargarDatosPersonalesActions';

//elemnts

const ConductorListaPage = (props) => {

     // if (!props.state.secretariaReducer.usuarioLog) {
     //      props.history.push("/Carga");
     //      return <div />
     // }

     const getLista = () => {
          var list = [];
          var data = props.state.conductorReducer.data;
          Object.keys(data).map((key) => {
               var obj = data[key];
               list.push({
                    key,
                    Key:{dato:key},
                    CI: obj.data.CI,
                    Nombres: obj.data.Nombres,
                    Apellidos: obj.data.Apellidos,
                    Correo: obj.data.Correo,
                    Telefono: obj.data.Telefono,
                    fecha_on: { dato: new Date(obj.usuario.fecha_on).toLocaleString() },
                    Editar: { dato: "Edit" }
               })
          })
          return list;
     }


     return (
          <NaviDrawer title={"Lista de Conductores"} history={props.history}

               page={() => {

                    if (!props.state.conductorReducer.data) {
                         if (!props.state.socketReducer.socket) {
                              return <CircularProgress color="#fff" style={{ display: "block" }} />
                         }
                         if (props.state.conductorReducer.estado == "cargando") {
                              return <CircularProgress color="#fff" style={{ display: "block" }} />
                         }
                         if (props.state.conductorReducer.estado == "error") {
                              return <div>{props.state.conductorReducer.error}</div>
                         }
                         var objSend = {
                              component: "usuario",
                              type: "getAllCabecera",
                              estado: "cargando",
                              cabecera: "registro_conductor",
                              data: ""
                         };
                         props.state.socketReducer.send(objSend);
                         return <CircularProgress color="#fff" style={{ display: "block" }} />
                    }
                    return (
                         <Grid container direction="row">
                              <Grid item xs={12}>
                                   <TableNewMe
                                        title={"Conductores"}
                                        head={[
                                             { id: 'Key', label: 'key' },
                                             { id: 'CI', label: 'CI' },
                                             { id: 'Nombres', label: 'Nombres' },
                                             { id: 'Apellidos', label: 'Apellidos' },
                                             { id: 'Telefono', label: 'Telefono' },
                                             { id: 'Correo', label: 'Correo' },
                                             { id: 'fecha_on', label: 'Creacion' },
                                             { id: 'Editar', label: 'Editar' },
                                        ]}
                                        order={{
                                             key: "fecha_on",
                                             dir: "desc"
                                        }}
                                        data={getLista()}
                                        onAdd={(evt) => {
                                             props.history.push("/ConductorRegistroPage")
                                        }}
                                        handleClick={
                                             (key) => {
                                                  props.history.push("/ConductorPerfilPage/" + key)
                                                  return;
                                             }
                                        }
                                        editClick={
                                             (key) => {
                                                  // props.history.push("/DoctorRegistroPage/" + key)
                                                  props.history.push("/ConductorRegistroPage/" + key)
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
};

const initStates = (state) => {
     return { state }
};

const initActions = {
     ...cargarDatosPersonalesActions
};

export default connect(initStates, initActions)(ConductorListaPage);

