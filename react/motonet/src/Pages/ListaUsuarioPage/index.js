//libs
import React from 'react';
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import TableNewMe from '../../Components/TableNewMe';
import { CircularProgress, Grid } from '@material-ui/core';
//import PerfilUsuario from '../../Components/PerfilUsuario'
import * as  cargarDatosPersonalesActions from '../../Actions/cargarDatosPersonalesActions';
import * as  GetAllRoleUsuario from '../../SSPetitions/GetAllRoleUsuario';

//elemnts

const ListaUsuarioPage = (props) => {
     // if (!props.state.usuarioReducer.usuarioLog) {
     //      props.history.push("/");
     //      return <div />
     // }

     const getLista = () => {
          var list = [];
          var data = props.state.usuarioReducer.data;
          Object.keys(data).map((key) => {
               var obj = data[key];

               // var cabecera = "";
               var cabecera = obj.usuario.key_cabecera;
               if (props.state.cabeceraDatosReducer.cabeceras[obj.usuario.key_cabecera]) {
                    cabecera = props.state.cabeceraDatosReducer.cabeceras[obj.usuario.key_cabecera].descripcion
               }
               // if(cabecera!="registro_administrador"){
               //      return;
               // }
               list.push({
                    key,
                    Key: { dato: key },
                    Nombres: obj.data.Nombres,
                    Apellidos: obj.data.Apellidos,
                    Correo: obj.data.Correo,
                    Telefono: obj.data.Telefono,
                    fecha_on: { dato: new Date(obj.usuario.fecha_on).toLocaleString() },
                    key_cabecera: { dato: cabecera },
                    cambiarRol: { dato: true }
               })
          })

          return list;
     }


     return (
          <NaviDrawer title={"Lista de Administradores"} history={props.history}
               page={() => {
                    if (!props.state.usuarioReducer.data) {
                         if (!props.state.socketReducer.socket) {
                              return <CircularProgress color="#fff" style={{ display: "block" }} />
                         }
                         if (props.state.usuarioReducer.estado == "cargando") {
                              return <CircularProgress color="#fff" style={{ display: "block" }} />
                         }
                         if (props.state.usuarioReducer.estado == "error") {
                              return <div>{props.state.usuarioReducer.error}</div>
                         }
                         var objSend = {
                              component: "usuario",
                              type: "getAll",
                              estado: "cargando",
                              cabecera: "registro_administrador",
                              data: ""
                         };
                         props.state.socketReducer.send(objSend);
                         return <CircularProgress color="#fff" style={{ display: "block" }} />
                    }

                    var petition = GetAllRoleUsuario.ejecutar({
                    }, props);
                    if (!petition.estado) {
                         return petition.component
                    }
                    var rolesUsuario = petition.data;

                    return (
                         <Grid container direction="row">
                              <Grid item xs={12}>
                                   <TableNewMe
                                        title={"Usuarios"}
                                        head={[
                                             { id: 'Key', label: 'key' },
                                             { id: 'Nombres', label: 'Nombres' },
                                             { id: 'Apellidos', label: 'Apellidos' },
                                             { id: 'Telefono', label: 'Telefono' },
                                             { id: 'Correo', label: 'Correo' },
                                             { id: 'fecha_on', label: 'Fecha Creacion' },
                                             { id: 'key_cabecera', label: 'key_cabecera' },
                                             { id: 'cambiarRol', label: 'ROL' },
                                        ]}
                                        order={{
                                             key: "fecha_on",
                                             dir: "desc"
                                        }}
                                        data={getLista()}
                                        onAdd={(evt) => {
                                             props.history.push("/UsuarioRegistroPage")
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

