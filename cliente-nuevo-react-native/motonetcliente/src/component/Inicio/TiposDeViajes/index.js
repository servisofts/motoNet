import React from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

const TiposDeViajes = (props) => {

    if (props.ventanaSelect != "tipoDeViaje") {
        return <View />
    }

    if (props.state.tipoViajesReducer.estado == "cargando") {
        return <View />
    }

    if (!props.state.tipoViajesReducer.data) {
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "tipoViaje",
            type: "getAll",
            estado: "cargando"
        }, true);
        return <View />
    }

    const EnviarDetalleViaje = (objTipoViaje) => {
        var exito = true
        var destino = []
        var contador = 1
        Object.keys(props.state.viajesReducer.ubicacion).map((key) => {
            var obj = props.state.viajesReducer.ubicacion[key]
            if (!obj.data) {
                exito = false
            }
            var dato = {
                index: contador,
                latitude: obj.data.latitude,
                longitude: obj.data.longitude,
                direccion: obj.data.direccion
            }
            destino.push(dato)
            contador++
        })

        if (exito) {
            props.state.viajesReducer.key_tipo_viaje = objTipoViaje.key;
            //props.state.locationGoogleMapReducer.route = false;
            props.dispatch({
                component:"locationGoogle",
                type:"route",
                estado:"exito",
                data:false
            })
            console.log("entro al renderrr.............")
            props.setVentanaSelect("DetalleDeViaje")
            return <View />
        }
        alert("falta rellenar datos en la carrera")
    }


    const ListaTiposDeViajes = () => {
        return Object.keys(props.state.tipoViajesReducer.data).map((key) => {
            var obj = props.state.tipoViajesReducer.data[key];
            return (
                <TouchableOpacity style={{
                    height: 100,
                    borderRadius: 20,
                    width: 150,
                    marginRight: 10,
                    marginLeft: 10,
                    backgroundColor: "#fff",
                    borderColor: "red",
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
                    onPress={() => {
                        EnviarDetalleViaje(obj)
                    }}
                >
                    <Text>
                        {obj.descripcion}
                    </Text>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
            alignItems: "center"
        }}>
            <View style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
            }}>
                <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1, justifyContent:"center"}} style={{
                    flex: 1,
                }}>
                    {ListaTiposDeViajes()}
                </ScrollView>
            </View>
        </View>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TiposDeViajes);


