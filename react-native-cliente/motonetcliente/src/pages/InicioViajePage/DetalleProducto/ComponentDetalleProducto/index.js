import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import STheme from '../../../../STheme';
import Svg from '../../../../Svg';
import Boton1 from '../../../../component/Boton1';
import AppParams from "../../../../Json"

const ComponentDetalleProducto = (props) => {

    // console.log("edson " + JSON.stringify(props.data))

    const getDetalleRuta = () => {
        // var tipos_de_viajes = props.state.tipoViajesReducer.data;
        return (
            <View style={{
                flex: 1,
                margin: 10,
            }}>
                <View style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#ccc"
                }}>
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        // alignItems: "center",
                        // backgroundColor: "#000"
                    }}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <View style={{
                                backgroundColor: "#ccc",
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                overflow: "hidden",
                                margin: 10
                            }}>
                                {props.state.imageReducer.getImage(AppParams.urlImages + "perfil.png?type=getPerfil&key_usuario=" + props.state.viajesReducer.data.key_conductor, {
                                })}
                            </View>
                            <View style={{
                                // backgroundColor: "#ccc",
                                width: "100%",
                                justifyContent: "center"
                            }}>
                                <Text style={{
                                    color: "#000"
                                }}>{props.data["Nombres"].dato} {props.data["Apellidos"].dato}
                                </Text>
                                <Text style={{
                                    color: "#000"
                                }}>{props.data["Correo"].dato}
                                </Text>
                                <Text style={{
                                    color: "#000"
                                }}>{props.data["Telefono"].dato}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: "100%",
                        height: 1.5,
                        backgroundColor: "#ccc"
                    }}>
                    </View>
                </View>
            </View>
        )
    }


    const getlistaItems = () => {
        // console.log("aaaa" + JSON.stringify(props.state.viajesReducer.data.pedido))

        let data = props.state.viajesReducer.data.pedido;

        if (Object.keys(data).length <= 0) {
            return <View />
        };

        var LIST = Object.keys(data).map((key) => {
            var obj = data[key];
            return (


                <View style={{
                    height: 40,
                    width: "100%",
                    marginBottom: 15,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>


                    <View style={{
                        // flex: 1,
                    }}>
                        <Text style={{
                            color: STheme.color.textb
                        }}>{obj.nombre}</Text>
                        <Text style={{
                            color: STheme.color.textb
                        }}>{obj.cantidad} Unidades</Text>
                    </View>
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderWidth: 1,
                            borderColor: "#999",
                            borderRadius: 4,
                            overflow: "hidden",
                        }}>
                        {props.state.imageReducer.getImage(AppParams.urlImages + "foto.png?type=pedido&key=" + obj.key, {
                        })}
                    </View>

                    {/* <TouchableOpacity style={{
                        width: 40,
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={() => {
                        delete this.state.productos[key];
                        this.setState({ productos: this.state.productos })
                    }}>
                        <Svg name={"Eliminar"} style={{
                            width: 20,
                            height: 20,
                            fill: "#000"
                        }} />
                    </TouchableOpacity> */}

                </View>

            )
        })
        return (
            <View style={{
                flex: 1,
                margin: 10
            }}>
                <View style={{
                    marginBottom: 20
                }}>
                    <Text style={{
                        color: STheme.color.textb,
                        fontSize: 14,
                        fontWeight: "bold",
                    }}>Productos añadidos</Text>
                </View>

                <ScrollView style={{
                    flex: 1
                }}>
                    {LIST}
                </ScrollView>

            </View>
        )
    }

    return (

        <View style={{
            position: "absolute",
            width: "100%",
            // height: Dimensions.get('window').height * 0.3,
            height: 400,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: "#fff",
            // borderColor: "#ccc",
            flex: 1,
            bottom: 0
        }}>

            {/* {getDetalleRuta()} */}


            {getlistaItems()}


            <TouchableOpacity
                onPress={() => {
                    props.close()
                    return <View />
                }}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor:"#ccc"
                }}>
                <Svg name="Cerrar"
                    style={{
                        width: 20,
                        height: 20,
                        margin: 1,
                        fill: STheme.color.background
                    }} />
            </TouchableOpacity>

        </View >
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ComponentDetalleProducto);


