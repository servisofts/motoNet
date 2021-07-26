//libs
import React from 'react';
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import TableNewMe from '../../Components/TableNewMe';
import { CircularProgress, Grid,Button } from '@material-ui/core';
//import PerfilUsuario from '../../Components/PerfilUsuario'
import * as  cargarDatosPersonalesActions from '../../Actions/cargarDatosPersonalesActions';
import * as  GetAllRoleUsuario from '../../SSPetitions/GetAllRoleUsuario';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//elemnts
var key = "";
const ListaUsuarioPage = (props) => {
     // if (!props.state.usuarioReducer.usuarioLog) {
     //      props.history.push("/");
     //      return <div />
     // }

     const [open, setOpen] = React.useState(false);

     const handleClickOpen = (codigo) => {
          key = codigo
          setOpen(true);
     };
     const handleClose = () => {
          setOpen(false);
     };

     const eliminar = () => {
          var objEliminar = {
               component: "usuario",
               type: "eliminar",
               estado: "cargando",
               key_admin: key,
               key_usuario: props.state.usuarioReducer.usuarioLog.key
          }
          props.state.socketReducer.send(objEliminar);
          handleClose();
     }

     const getLista = () => {
          var list = [];
          var data = props.state.usuarioReducer.data;
          Object.keys(data).map((key) => {
               var obj = data[key];
               var cabecera = "";
               cabecera = obj.usuario.key_cabecera;
               if (props.state.cabeceraDatosReducer.cabeceras[obj.usuario.key_cabecera]) {
                    cabecera = props.state.cabeceraDatosReducer.cabeceras[obj.usuario.key_cabecera].descripcion
               }
               if (cabecera != "registro_administrador") {
                    return;
               }
               /*var cabecera = "";
               if (props.state.cabeceraDatosReducer.cabeceras[obj.usuario.key_cabecera]) {
                    cabecera = props.state.cabeceraDatosReducer.cabeceras[obj.usuario.key_cabecera].descripcion
               }
               if(cabecera!="registro_administrador"){
                    return;
               }*/
               list.push({
                    key,
                    Key: { dato: key },
                    Nombres: obj.data.Nombres,
                    Apellidos: obj.data.Apellidos,
                    Correo: obj.data.Correo,
                    Telefono: obj.data.Telefono,
                    fecha_on: { dato: new Date(obj.usuario.fecha_on).toLocaleString() },
                    key_cabecera: { dato: cabecera },
                    //cambiarRol: { dato: true }
                    Editar: { dato: "Edit" }
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
                         <>
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
                                                  // { id: 'cambiarRol', label: 'ROL' },
                                                  { id: 'Editar', label: 'Editar' },
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
                                             editClick={
                                                  (key) => {
                                                       props.history.push("/UsuarioRegistroPage/" + key)
                                                       return;
                                                  }
                                             }
                                             onDelete={(key) => {
                                                  handleClickOpen(key)
                                             }}
                                        />
                                   </Grid>
                              </Grid>
                              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                   <DialogTitle id="form-dialog-title" style={{ color: "red" }}>ELIMINAR</DialogTitle>
                                   <DialogContent>
                                        <DialogContentText>
                                             ¿Estás seguro que deseas eliminar la especialidad?
                             </DialogContentText>
                                   </DialogContent>
                                   <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                             Cancel
                                        </Button>
                                        <Button onClick={() => eliminar()} color="primary">
                                             Eliminar
                                        </Button>
                                   </DialogActions>
                              </Dialog>
                         </>
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

