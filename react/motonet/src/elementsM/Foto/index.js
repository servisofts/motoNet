import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import Props from '../../nativeSocket/myProps.json'
const Foto = (props) => {
  var fotFin = false;
  props.state.fotoReducer.fotos.map((obj, key) => {
    if (obj.nombre === props.nombre) {
      fotFin = obj.foto;
      if (obj.estado === "cambio") {
        const foto = (<Image source={{ uri: Props.images.urlImage + props.nombre+`?tipo=${props.tipo}&date=${Date.now()}` }} style={{ width: "100%", height: "100%" ,fill:"#000"}} />);
        var obj = { nombre: props.nombre, foto: foto, estado: "exito" };
        props.state.fotoReducer.fotos[key] = obj;
        fotFin = foto;
      }
    }
  })
  if (!fotFin) {
    const foto = (<Image source={{ uri: Props.images.urlImage + props.nombre+`?tipo=${props.tipo}` }} style={{ width: "100%", height: "100%",fill:"#000" }} />);
    var obj = { nombre: props.nombre, foto: foto, estado: "exito" };
    props.state.fotoReducer.fotos.push(obj);
    fotFin = foto;
  }
  return (
    fotFin
  );
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Foto);
