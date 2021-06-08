import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';
import STheme from '../../../STheme';
import Geolocation from '@react-native-community/geolocation';

const ListaBusqueda = (props) => {


    const [data, setData] = React.useState({
        dataUbicacion: false,
        mostrarTexto: false,
        ubicacionActual: props.ubicacionActual || false,
        repuestaInput: false,
        focusInput: false,
        ubicacion: props.state.viajesReducer.ubicacion
    })


    const [mostrar, setMostrar] = React.useState({
        textOcultar: "Ocultar Lista",
        textMostrar: "Mostrar Lista",
        estado: true
    })

    // if (!props.state.locationGoogleMapReducer.listaBusqueda) {
    //     return <View />
    // }

    var lista = props.state.locationGoogleMapReducer.listaBusqueda

    const ModeloLista = () => {

        if (!lista) {
            return <View />
        }

        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {lista.map((obj) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    props.onchage(obj)
                                }}
                                style={{
                                    width: "95%",
                                    height: 60,
                                    flex: 1,
                                    // backgroundColor: "#1f84f5",
                                    // borderRadius: 20,
                                    margin: 5,
                                    // padding: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',

                                }}>
                                <View style={{
                                    width: 50,
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // backgroundColor: "#000"
                                }}>
                                    <Svg name="Reloj"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            fill: "#ffffff"
                                        }} />
                                </View>

                                <View style={{
                                    flex: 1,
                                }}>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }}>
                                        <Text style={{
                                            color: "#000",
                                            fontSize: 13,
                                            margin: 5,
                                        }}>{obj.direccion}</Text>
                                    </View>

                                    <View style={{
                                        height: 1.2,
                                        width: "96%",
                                        backgroundColor: "#a4a4a4"
                                    }}>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </>
                    )
                })}
            </View>
        )
    }

    const peticion = (text) => {
        Geolocation.getCurrentPosition((info) => {
            data.ubicacionActual = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            }
            var direccions = false

            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "locationGoogle",
                type: "autoComplete",
                data: {
                    direccion: text,
                    ...data.ubicacionActual
                },
                estado: "cargando"
            }, true);
        });
    }

    const hanlechage = (text) => {
        if (text.length > 5) {
            if (props.state.viajesReducer.ubicacion.inicio.estado) {
                props.state.viajesReducer.ubicacion.inicio.value = text
            }
            if (props.state.viajesReducer.ubicacion.fin.estado) {
                props.state.viajesReducer.ubicacion.fin.value = text
            }
            actualizarUbicacion()
            peticion(text)
        }
        if (props.state.viajesReducer.ubicacion.inicio.estado) {
            props.state.viajesReducer.ubicacion.inicio.value = text

        }
        if (props.state.viajesReducer.ubicacion.fin.estado) {
            props.state.viajesReducer.ubicacion.fin.value = text

        }
        actualizarUbicacion()
        return <View />
    };

    const actualizarUbicacion = () => {
        props.dispatch({
            component: "viaje",
            type: "actualizarUbicacion",
            data: props.state.viajesReducer.ubicacion,
            estado: "exito"
        })
        return <View />
    }

    const repuestaText = () => {
        if (mostrar.estado) {
            return mostrar.textOcultar
        }
        return mostrar.textMostrar
    }

    return (
        <View style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "#fff"
        }}>

            <View style={{
                height: 80,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: STheme.color.background
            }}>

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: "90%",
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 5,
                    height: 40,
                }}>
                    <TouchableOpacity style={{
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor:"#ccc"
                    }} onPress={() => {
                        props.setVentanaBusqueda(false)
                    }}>
                        <Svg name={"Arrow"}
                            style={{
                                width: 20,
                                height: 20,
                                fill: "#fff"
                            }} />
                    </TouchableOpacity>

                    {/* </View> */}

                    <TextInput style={{
                        flex: 1,
                        fontSize: 10,
                        alignItems: 'center',
                        height: "100%",
                        fontSize: 13,
                        color: "#fff",
                        // paddingLeft: 10,
                        // backgroundColor:"#ccc"
                    }}
                        onFocus={() => {
                            props.state.viajesReducer.ubicacion.fin.estado = false
                            props.state.viajesReducer.ubicacion.inicio.estado = true
                            actualizarUbicacion()
                        }}
                        placeholder={"Calle"}
                        // value={props.state.viajesReducer.ubicacion.inicio.value}
                        onChangeText={(texto) => hanlechage(texto)}
                    />
                </View>
            </View>

            <ScrollView>
                {ModeloLista()}
            </ScrollView>

        </View>
    )

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ListaBusqueda);
