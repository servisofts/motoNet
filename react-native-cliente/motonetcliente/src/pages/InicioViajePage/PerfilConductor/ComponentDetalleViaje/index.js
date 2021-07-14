import React, { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import STheme from '../../../../STheme';
import Svg from '../../../../Svg';
import Boton1 from '../../../../component/Boton1';

const ComponentDetalleViaje = (props) => {

    console.log("edson " + JSON.stringify(props.data))

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
                                margin: 10
                            }}>
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

            {getDetalleRuta()}

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
export default connect(initStates)(ComponentDetalleViaje);


