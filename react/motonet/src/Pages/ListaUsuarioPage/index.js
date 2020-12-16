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


const ListaUsuarioPage = (props) => {

     if (!props.state.usuarioReducer.usuarioLog) {
          props.history.push("/Carga");
          return <div />
     }


     const getLista = () => {

          var list = [];
          var data = props.state.usuarioReducer.data;
          Object.keys(data).map((key) => {
               var obj = data[key];
               console.log(obj);
               list.push({
                    key,
                    Nombres: obj.Nombres,
                    Apellidos: obj.Apellidos,
                    Correo: obj.Correo,
                    Telefono: obj.Telefono,
               })
          })

          return list;
     }


     return (
          <NaviDrawer title={"Usuarios nuevos"} history={props.history}

               page={() => {
                    if (!props.state.socketReducer.socket) {
                         return <CircularProgress color="#fff" style={{ display: "block" }} />
                    }
                    if (props.state.usuarioReducer.estado == "cargando") {
                         return <CircularProgress color="#fff" style={{ display: "block" }} />
                    }
                    if (props.state.usuarioReducer.estado == "error") {
                         return <div>{props.state.usuarioReducer.error}</div>
                    }
                    if (!props.state.usuarioReducer.data) {
                         var objSend = {
                              component: "usuario",
                              type: "getAllNuevo",
                              estado: "cargando",
                              cabecera: "registro_cliente",
                              data: ""
                         };
                         props.state.socketReducer.send(objSend);
                         return <CircularProgress color="#fff" style={{ display: "block" }} />
                    }
                    return (
                         <Grid container direction="row">
                              <Grid item xs={12} spacing={2} >
                                   <TableNewMe
                                        title={"Usuarios"}
                                        head={[
                                             { id: 'Nombres', label: 'Nombres' },
                                             { id: 'Apellidos', label: 'Apellidos' },
                                             { id: 'Telefono', label: 'Telefono' },
                                             { id: 'Correo', label: 'Correo' },
                                        ]}
                                        order={{
                                             key: "Nombres",
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

export default connect(initStates, initActions)(ListaUsuarioPage);

