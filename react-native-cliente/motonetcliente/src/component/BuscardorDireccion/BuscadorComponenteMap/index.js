import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Svg from '../../../Svg';
import ListaBusqueda from '../ListaBusqueda';
import * as locationActions from '../../../action/locationActions'
import AppParams from '../../../Json';

const BuscadorComponenteMap = (props) => {
    const [data, setData] = React.useState({
        obj: {
            texto: "",
            escribiendo: "",
        },
        escribir: false,
        dataUbicacion: false,
        mostrarTexto: false,
        ubicacionActual: props.ubicacionActual || false,
        repuestaInput: false,
        focusInput: false
    })

    if (props.state.locationGoogleMapReducer.estado === "exito") {
        if (props.state.locationGoogleMapReducer.type === "autoComplete") {
            data.repuestaInput = props.state.locationGoogleMapReducer.data
            data.escribir = true
        }
        if (props.state.locationGoogleMapReducer.type === "geocode") {
            data.escribir = false
            data.dataUbicacion = props.state.locationGoogleMapReducer.data
            data.obj.texto = props.state.locationGoogleMapReducer.data.direccion
        }
        if (props.state.locationGoogleMapReducer.type === "actualizar") {
            props.state.locationGoogleMapReducer.estado = ""
            props.navigation.goBack();
            return <View />
        }
        props.state.locationGoogleMapReducer.estado = "";
        setData({ ...data });
    }
    const hanlechageLista = (obj) => {
        data.obj.escribiendo = obj.direccion
        data.dataUbicacion = obj
        data.escribir = true
        setData({ ...data })
        return <View />
    };
    const peticion = () => {
        Geolocation.getCurrentPosition((info) => {
            data.ubicacionActual = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            }
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "locationGoogle",
                type: "autoComplete",
                data: {
                    direccion: data.obj.escribiendo,
                    ...data.ubicacionActual
                },
                estado: "cargando"
            }, true);
            console.log("heyyy")
            // console.log(data.ubicacionActual)
            props.dispatch({
                component: "locationEmergencia",
                type: "Miubicacion",
                data: data.ubicacionActual,
            });
        });
    }
    const hanlechage = (text) => {
        if (text.length > 5) {
            data.obj.escribiendo = text
            peticion()
            setData({ ...data })
            return <View />
        }
        data.obj.escribiendo = text
        setData({ ...data })
        return <View />
    };


    const textoBuscador = () => {
        console.log(data)
        if (data.escribir) {
            return data.obj.escribiendo
        }
        return data.obj.texto
    }
    return (

        <View style={{
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            position: "absolute",
            top: 8,
        }}>
            <View
                style={styles.buscar}>
                <TextInput
                    style={{
                        flex: 0.95,
                        width: "90%",
                        fontSize: 10,
                        textAlign: "center",
                        color: "#000000"
                    }}
                    onFocus={() => {
                        data.escribir = true
                        setData({ ...data })
                    }}
                    placeholder={"Calle"}
                    value={textoBuscador()}
                    onChangeText={(texto) => hanlechage(texto)}
                    editable={false}
                />
                <View>
                    {/* <TouchableOpacity
                        onPress={() => {
                            data.escribir = true
                            data.obj.escribiendo = ""
                            data.obj.texto = ""
                            setData({ ...data })
                        }}
                    >
                        <Svg name="borrar"
                            style={{
                                width: 25,
                                height: 25,
                                fill: "#000000"

                            }} />
                    </TouchableOpacity> */}
                </View>
            </View>
            <ListaBusqueda onchage={hanlechageLista} />
        </View>
    )

}
const styles = StyleSheet.create({
    buscar: {
        width: "95%",
        height: 50,
        borderColor: "#00000022",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    touchableOpacity: {
        width: 150,
        height: 50,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        borderRadius: 10,
        bottom: 10
    },
    touchableOpacity2: {
        width: 150,
        height: 50,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        borderRadius: 10,
        bottom: 10
    },

});
const initActions = ({
    ...locationActions,
});
const initStates = (state) => {
    return { state }
};

export default connect(initStates, initActions)(BuscadorComponenteMap);

