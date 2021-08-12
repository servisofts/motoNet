import React, { useRef } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, Text, TouchableOpacity, View, Animated, Easing, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import STheme from '../../../../STheme';
import Svg from '../../../../Svg';
import Boton1 from '../../../../component/Boton1';
import { SPopupOpen } from '../../../../SPopup';

var totalViaje; 

const ComponentDetalleViaje = (props) => {

    let data = props.tipo_viaje
    let key_viaje = ""

    // console.log("edson " + JSON.stringify(data))

    const PedirViaje = (tiempo, distancia) => {
        var exito = true        
        if (exito) {
            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "viaje",
                type: "buscar",
                data: {
                    key_tipo_viaje: key_viaje,
                    tiempo: tiempo,
                    distancia: distancia,
                    monto_estimado: totalViaje,
                    direccion_inicio: data.direccionInicio,
                    direccion_fin: data.direccionFin,
                    pedidos: data.productos,
                    paquete: data.paquete,
                    detalle_p1: data.inicio,
                    detalle_p2: data.fin,
                    key_usuario: props.state.usuarioReducer.usuarioLog.key,
                },
                estado: "cargando"
            }, true);
            return <View />
        }
        //alert("falta rellenar datos en la carrera")
        SPopupOpen({
            key: "noConductor",
            content: (
                <View alignItems="center" >
                    <Svg name={"Warning2"}
                    style={{
                        width: 100,
                        height: 100,
                        fill: "#f00",
                    }} />
                    <Text style={{paddingTop:10, fontSize:15}}>Falta rellenar datos en la carrera.</Text>
                </View>
            )
        })
    }


    const getDetalleRuta = () => {

        var tipos_de_viajes = props.state.tipoViajesReducer.data;
        if (!tipos_de_viajes) {
            return <View />
        }
        var TipoViaje = false;
        var distancia = false
        var duracion = false
        Object.keys(tipos_de_viajes).map((key) => {
            var obj = tipos_de_viajes[key];
            var codigo = props.tipo_viaje.tipo_viaje;
            if (codigo == "transporte") {
                codigo += "-" + props.tipo_viaje.tipo;
            }
            if (obj.codigo == codigo) {
                TipoViaje = obj;
            }
        })

        key_viaje = TipoViaje.key

        var dataDis = props.duracion
        if (TipoViaje.codigo == "pedido") {
            dataDis = { duracion: 1000, distancia: 5000 };
        }

        if (!dataDis) {
            return <ActivityIndicator color="#000" />
        }

        duracion = dataDis.duracion
        distancia = dataDis.distancia

        if (!TipoViaje) {
            return <Text>Error. (TipoViaje) Not found</Text>
        }
        var tarifas = TipoViaje.tarifas;
        if (!tarifas) {
            return <Text>Error. (tarifas) Not found</Text>
        }
        var montoTiempo = tarifas["Monto por tiempo"]
        var montoKm = tarifas["Monto por kilometro"]
        var totalTiempo = (montoTiempo.monto / (60)) * duracion;
        var totalDistancia = (montoKm.monto / 1000) * distancia;
        var totalCalculado = totalTiempo + totalDistancia;
        totalViaje = Math.round(totalCalculado)

        return (
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
                            }}>{(duracion / 60).toFixed(0)} min Aprox.
                            </Text>

                            <Text style={{
                                color: STheme.color.textb,
                                fontSize: 12,
                            }}>
                                {(distancia / 1000).toFixed(1)} km Aprox
                            </Text>
                        </View>

                        <View style={{
                            flex: 0.5,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Boton1 type="1"
                                label="Confirmar"
                                cargando={props.state.viajesReducer.estado == "cargando"}
                                onPress={() => PedirViaje((duracion / 60).toFixed(0), (distancia / 1000).toFixed(1))} />
                        </View>
                    </View>
                </View>

                <View style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#ccc"
                }}>
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "#000"
                    }}>
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
                                        // props.state.locationGoogleMapReducer.route = true;
                                        // props.setVentanaSelect("tipoDeViaje")
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
                    </View>
                </View>
            </View>
        )
    }

    const getAllPrecio = () => {
        if (props.state.tipoViajesReducer.estado == "cargando") {
            return <ActivityIndicator color="#000" />
        }
        if (!props.state.tipoViajesReducer.data) {
            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "tipoViaje",
                type: "getAll",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            return <View />
        }
        return <View />
    }

    return (

        <View style={{
            position: "absolute",
            width: "100%",
            // height: Dimensions.get('window').height * 0.3,
            height: 210,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: "#fff",
            // borderColor: "#ccc",
            flex: 1,
            bottom: 0
        }}>

            {getAllPrecio()}

            {getDetalleRuta()}

        </View >

    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ComponentDetalleViaje);


