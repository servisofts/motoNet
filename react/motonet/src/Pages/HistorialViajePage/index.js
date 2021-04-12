
//libs
import React from 'react';
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import TableNewMe2 from '../../Components/TableNewMe2';
import { CircularProgress, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
//import PerfilUsuario from '../../Components/PerfilUsuario'
import * as  cargarDatosPersonalesActions from '../../Actions/cargarDatosPersonalesActions';
import * as GetUsuarioByKey from '../../SSPetitions/GetUsuarioByKey'
import * as GetTipoViajeByKey from '../../SSPetitions/GetTipoViajeByKey';


//elemnts


const HistorialViajePage = (props) => {

     if (!props.state.usuarioReducer.usuarioLog) {
          props.history.push("/Carga");
          return <div />
     }


     const getLista = () => {

          var list = [];
          var data = props.state.historialViajeReducer.data;

          Object.keys(data).map((key) => {
               var obj = data[key];
               console.log(obj);
               /*datos usuario*/
               var getUsuario = GetUsuarioByKey.ejecutar({
                    key: obj.key_usuario,
                    cabecera: "registro_cliente"
               }, props);
               var objUsuario = getUsuario.data;
               if (!getUsuario.estado) {
                    return getUsuario.component
               }
               /*datos usuario*/

               /*datos tipoViaje*/
              /* var getTipViajeKey = GetTipoViajeByKey.ejecutar({
                    key_usuario: obj.key_usuario,
                    key_tipo_viaje: obj.key_tipo_viaje,
               }, props);
               var objTipoViaje = getTipViajeKey.data;
               if (!getTipViajeKey.estado) {
                    return getTipViajeKey.component
               }*/
               
               /*datos tipoViaje*/

               list.push({
                    key,
                    Key: obj.key,
                    usuario: objUsuario["Nombres"].dato + " " + objUsuario["Apellidos"].dato,
                    fecha_on: obj.fecha_on,
               })
          })

          return list;
     }


     return (
          <NaviDrawer title={"Historial de Viajes"} history={props.history}

               page={() => {
                    if (!props.state.socketReducer.socket) {
                         return <CircularProgress color="#fff" style={{ display: "block" }} />
                    }
                    if (props.state.historialViajeReducer.estado == "cargando") {
                         return <CircularProgress color="#fff" style={{ display: "block" }} />
                    }
                    if (props.state.historialViajeReducer.estado == "error") {
                         return <div>{props.state.historialViajeReducer.error}</div>
                    }
                    if (!props.state.historialViajeReducer.data) {
                         var objSend = {
                              component: "historialViaje",
                              type: "getAll",
                              estado: "cargando",
                              //cabecera: "registro_cliente",
                              data: ""
                         };
                         props.state.socketReducer.send(objSend);
                         return <CircularProgress color="#fff" style={{ display: "block" }} />
                    }
                    return (
                         <Grid container direction="row">
                              <Grid item xs={12} spacing={2} >
                                   <TableNewMe2
                                        title={"Historial de Viajes"}
                                        head={[
                                             { id: 'Key', label: 'key' },
                                             { id: 'usuario', label: 'USUARIO' },
                                             { id: 'fecha_on', label: 'Fecha registro' },
                                        ]}
                                        order={{
                                             key: "fecha_on",
                                             dir: "desc"
                                        }}
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
};

const initStates = (state) => {
     return { state }
};

const initActions = {
     ...cargarDatosPersonalesActions
};

export default connect(initStates, initActions)(HistorialViajePage);