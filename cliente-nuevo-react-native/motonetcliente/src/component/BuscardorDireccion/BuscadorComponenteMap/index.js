import React from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';
import ListaBusqueda from '../ListaBusqueda';
import * as locationActions from '../../../action/locationActions'
import * as viajesActions from '../../../action/viajesActions'
import Geolocation from '@react-native-community/geolocation';
const BuscadorComponenteMap = (props) => {
    const [data, setData] = React.useState({
        dataUbicacion: false,
        mostrarTexto: false,
        ubicacionActual: props.ubicacionActual || false,
        repuestaInput: false,
        focusInput: false
    })
    const actualizarUbicacion = () => {
        props.actualizarUbicacion(props.state.viajesReducer.ubicacion)
        return<View/>
    }
    if (props.state.locationGoogleMapReducer.estado === "exito") {
        if (props.state.locationGoogleMapReducer.type === "autoComplete") {
            if (props.state.viajesReducer.ubicacion.inicio.estado) {
                props.state.viajesReducer.ubicacion.inicio.value = props.state.locationGoogleMapReducer.data.direccion
                props.state.viajesReducer.ubicacion.inicio.data = props.state.locationGoogleMapReducer.data
            }
            if (props.state.viajesReducer.ubicacion.fin.estado) {
                props.state.viajesReducer.ubicacion.fin.data = props.state.locationGoogleMapReducer.data
                props.state.viajesReducer.ubicacion.fin.value = props.state.locationGoogleMapReducer.data.direccion
            }
        }
        if (props.state.locationGoogleMapReducer.type === "geocode") {
            if (props.state.viajesReducer.ubicacion.inicio.estado) {
                props.state.viajesReducer.ubicacion.inicio.value = props.state.locationGoogleMapReducer.data.direccion
                props.state.viajesReducer.ubicacion.inicio.data = props.state.locationGoogleMapReducer.data
            }
            if (props.state.viajesReducer.ubicacion.fin.estado) {
                props.state.viajesReducer.ubicacion.fin.data = props.state.locationGoogleMapReducer.data
                props.state.viajesReducer.ubicacion.fin.value = props.state.locationGoogleMapReducer.data.direccion
            }
        }
        if (props.state.locationGoogleMapReducer.type === "actualizar") {
            props.state.locationGoogleMapReducer.estado = ""
            props.navigation.goBack();
            setData({ ...data })
            return <View />
        }
        actualizarUbicacion()
        props.state.locationGoogleMapReducer.estado = "";
    }
    const buscarInput = () => {
        return (
            <View style={{
                flexDirection: 'column',
                position: "absolute",
                top: 0,
                width: "100%",
                alignItems: 'center',

            }}>
                <View
                    style={styles.buscar}>

                    <View style={{
                        flex: 1,
                        height: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#f00",
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                    }}>
                        <Text style={{ color: "#fff" }}>
                            Inicio

                        </Text>
                    </View>
                    <View style={{
                        width: "80%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>

                        <TextInput
                            style={{
                                flex: 0.9,
                                width: "90%",
                                fontSize: 10,
                                alignItems: 'center',

                            }}
                            onFocus={() => {
                                props.state.viajesReducer.ubicacion.fin.estado = false
                                props.state.viajesReducer.ubicacion.inicio.estado = true
                                actualizarUbicacion()
                            }}
                            placeholder={"Calle"}
                            value={props.state.viajesReducer.ubicacion.inicio.value}
                            onChangeText={(texto) => hanlechage(texto)}

                        />
                        <TouchableOpacity
                            onPress={() => {
                                props.state.viajesReducer.ubicacion.fin.estado = false
                                props.state.viajesReducer.ubicacion.inicio.estado = true
                                props.state.viajesReducer.ubicacion.inicio.value = ""
                                actualizarUbicacion()

                            }}
                        >
                            <Svg name="eliminar"
                                style={{
                                    width: 25,
                                    height: 25,
                                    fill: "#000000"

                                }} />
                        </TouchableOpacity>
                    </View>


                </View>
                <View
                    style={styles.buscar}>

                    <View style={{
                        flex: 1,
                        height: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#f00",
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                    }}>
                        <Text style={{ color: "#fff" }}>
                            Fin

                        </Text>
                    </View>
                    <View style={{
                        width: "80%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>

                        <TextInput
                            style={{
                                flex: 0.9,
                                width: "90%",
                                fontSize: 10,
                                alignItems: 'center',

                            }}
                            onFocus={() => {
                                props.state.viajesReducer.ubicacion.fin.estado = true
                                props.state.viajesReducer.ubicacion.inicio.estado = false
                                setData({ ...data })
                            }}
                            placeholder={"Calle"}
                            value={props.state.viajesReducer.ubicacion.fin.value}
                            onChangeText={(texto) => hanlechage(texto)}

                        />
                        <TouchableOpacity
                            onPress={() => {
                                props.state.viajesReducer.ubicacion.fin.estado = true
                                props.state.viajesReducer.ubicacion.inicio.estado = false
                                props.state.viajesReducer.ubicacion.fin.value = ""
                                actualizarUbicacion()
                            }}
                        >
                            <Svg name="eliminar"
                                style={{
                                    width: 25,
                                    height: 25,
                                    fill: "#000000"

                                }} />
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        )
    }
    const hanlechageLista = (obj) => {
        if (data.obj.inicio.estado) {
            data.obj.inicio.value = obj.direccion
            data.obj.inicio.data = obj.direccion
            setData({ ...data })
            return <View />
        }
        if (data.obj.fin.estado) {
            data.obj.inicio.value = obj.direccion
            setData({ ...data })
            return <View />
        }
        setData({ ...data })
        return <View />
    };
    const peticion = () => {
        Geolocation.getCurrentPosition((info) => {
            data.ubicacionActual = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            }
            var direccions = false

            /*         props.state.socketClienteReducer.sessiones["glup"].send({
                        component: "locationGoogle",
                        type: "autoComplete",
                        data: {
                            direccion:  props.state.viajesReducer.ubicacion.fin.value,
                            ...data.ubicacionActual
                        },
                        estado: "cargando"
                    }, true); */
        });
    }
    const hanlechage = (text) => {
        if (text.length > 5) {

            if (props.state.viajesReducer.ubicacion.inicio.estado) {
                props.state.viajesReducer.ubicacion.inicio.value = text
                peticion()
                return <View />
            }
            if (props.state.viajesReducer.ubicacion.fin.estado) {
                props.state.viajesReducer.ubicacion.fin.value = text
                peticion()
                return <View />
            }
        }
        setData({ ...data })
        return <View />
    };


    return (
        <View style={{
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            position: "absolute",
            top: 20,
            flexDirection: 'column',
        }}>


            {buscarInput()}
            <ListaBusqueda onchage={hanlechageLista} />

        </View>
    )

}
const styles = StyleSheet.create({
    buscar: {
        width: 300,
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
    ...viajesActions
});
const initStates = (state) => {
    return { state }
};

export default connect(initStates, initActions)(BuscadorComponenteMap);

