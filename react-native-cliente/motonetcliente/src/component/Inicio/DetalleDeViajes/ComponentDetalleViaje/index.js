import React, { useRef } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, Text, TouchableOpacity, View, Animated, Easing, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import STheme from '../../../../STheme';
import Svg from '../../../../Svg';
import Boton1 from '../../../Boton1';

var totalViaje;

const ComponentDetalleViaje = (props) => {



    const PedirViaje = (tarifas) => {
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
                direccion: obj.data.direccion,
            }
            destino.push(dato)
            contador++
        })

        if (exito) {
            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "viaje",
                type: "buscar",
                data: {
                    destinos: destino
                },
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                costoViaje: parseFloat(totalViaje),
                key_tipo_viaje: props.state.viajesReducer.key_tipo_viaje,
                estado: "cargando"
            }, true);
            return <View />
        }
        alert("falta rellenar datos en la carrera")
    }

    const getPrecio = (distancia, duracion) => {
        var keyTipoViaje = props.state.viajesReducer.key_tipo_viaje;
        if (!keyTipoViaje) {
            return <Text style={{ color: "#ccc" }}>Error. (keyTipoViaje) Not found</Text>
        }
        var TipoViaje = props.state.tipoViajesReducer.data[keyTipoViaje];
        if (!TipoViaje) {
            return <Text>Error. (TipoViaje) Not found</Text>
        }
        var tarifas = TipoViaje.tarifas;
        if (!tarifas) {
            return <Text>Error. (tarifas) Not found</Text>
        }
        var montoTiempo = tarifas["Monto por tiempo"]
        var montoKm = tarifas["Monto por kilometro"]
        var totalTiempo = (montoTiempo.monto / (60)) * distancia;
        var totalDistancia = (montoKm.monto / 1000) * distancia;
        var totalCalculado = totalTiempo + totalDistancia;
        totalViaje = Math.round(totalCalculado / 60)

        return (
            <View style={{
                width: "100%",
                height: "100%",
                justifyContent: "space-evenly",
                // backgroundColor: "#ccc"
            }}>

                <View style={{
                    flexDirection: "row",
                }}>
                    <View style={{
                        flex: 1,
                        // backgroundColor:"#000"
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: STheme.color.textb
                        }}>Efectivo</Text>
                        <Text style={{
                            fontSize: 12,
                            color: STheme.color.textb
                        }}>Tipo de pago</Text>
                    </View>

                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: STheme.color.textb
                        }}>Bs. {totalViaje}
                        </Text>

                        <Text style={{
                            fontSize: 12,
                            color: STheme.color.textb
                        }}>Monto estimado
                        </Text>
                    </View>
                </View>

                {/* <Text style={{
                    fontSize: 12,
                    color: STheme.color.textb
                }}>{TipoViaje.descripcion}</Text> */}


                <View style={{

                }}>
                    <TouchableOpacity style={{
                        height: 40,
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f3f3fd"
                    }}
                        onPress={() => {
                            props.state.locationGoogleMapReducer.route = true;
                            props.setVentanaSelect("tipoDeViaje")
                            return <View />
                        }}>
                        <Text>
                            Consejos la app y mensajes
                            <Text style={{
                                color: "#f00",
                                fontWeight: "bold"
                            }}> Ver</Text>
                        </Text>
                    </TouchableOpacity>
                </View>


                {/* <Text>Tipo viaje: {TipoViaje.descripcion}</Text> */}
                {/* <Text>distancia: {distancia / 1000} km</Text> */}
                {/* <Text>Tiempo: {Math.round(duracion / 60) - 1} a {Math.round(duracion / 60) + 1} minutos.</Text> */}
                {/* <Text>Monto por kilometro {montoKm.monto}</Text>
                <Text>Monto por tiempo {montoTiempo.monto}</Text>
                <Text>Monto por km * distancia {totalDistancia}</Text>
                <Text>Monto por tiempo * duracion {totalTiempo}</Text>  */}

            </View>
        )
    }

    const getDetalleRuta = () => {
        if (!props.state.locationGoogleMapReducer.route) {
            // return <View />
        }
        var route = props.state.locationGoogleMapReducer.route;
        return (
            <View style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "#000"
            }}>
                {getPrecio(route.distancia, route.duracion)}
            </View>
        )
    }

    return (

        <View style={{
            position: "absolute",
            width: "100%",
            // height: Dimensions.get('window').height * 0.3,
            height: 220,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: "#fff",
            // borderColor: "#ccc",
            flex: 1,
            bottom: 0
        }}>

            <View style={{
                flex: 1,
                margin: 10,
            }}>
                <View style={{
                    flex: 1,
                    // justifyContent:"center",
                    // alignItems:"center"
                }}>
                    <View style={{
                        marginBottom: 15,
                        // backgroundColor:"#ccc"
                    }}>
                        <Text style={{
                            color: STheme.color.textb,
                            fontSize: 14,
                        }}>
                            Confirme el viaje
                        </Text>

                    </View>

                    <View style={{
                        flexDirection: "row",
                        // backgroundColor: "#ccc"
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            // alignItems: "center",
                        }}>
                            <Text style={{
                                color: STheme.color.textb,
                                fontSize: 16,
                                fontWeight: "bold"
                            }}>30 min Aprox.
                            </Text>

                            <Text style={{
                                color: STheme.color.textb,
                                fontSize: 12,
                            }}>
                                22 min tiempo perdido
                            </Text>
                        </View>

                        <View style={{
                            flex: 0.5,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>

                            {!props.botonConfirmar ?
                                <Boton1 type="1"
                                    label="Cancelar"
                                    cargando={props.state.viajesReducer.type == "cancelarBusqueda" && props.state.viajesReducer.estado == "cargando"}
                                    onPress={() => {
                                        props.state.locationGoogleMapReducer.route = true;
                                        props.state.socketClienteReducer.sessiones["motonet"].send({
                                            component: "viaje",
                                            type: "cancelarBusqueda",
                                            key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                            key_viaje: props.state.viajesReducer.data.key,
                                            estado: "cargando"
                                        }, true);
                                    }} />
                                :
                                <Boton1 type="1"
                                    label="Confirmar"
                                    cargando={props.state.viajesReducer.estado == "cargando"}
                                    onPress={() => PedirViaje()} />
                            }
                        </View>
                    </View>
                </View>

                <View style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#ccc"
                }}>
                    {getDetalleRuta()}
                </View>
            </View>

        </View>

    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ComponentDetalleViaje);


