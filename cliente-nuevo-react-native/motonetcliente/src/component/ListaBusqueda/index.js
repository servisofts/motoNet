import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../Svg';
const ListaBusqueda = (props) => {
    const [mostrar, setMostrar] = React.useState({
        textOcultar: "Ocultar Lista",
        textMostrar: "Mostrar Lista",
        estado: true
    })
    if (!props.state.locationGoogleMapReducer.listaBusqueda) {
        return <View />
    }
    var lista = props.state.locationGoogleMapReducer.listaBusqueda
    const ModeloLista = () => {
        if (!mostrar.estado) {
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
                        <TouchableOpacity
                            onPress={() => {
                                prowps.onchage(obj)
                            }}
                            style={{
                                width: "100%",
                                height: 50,
                                flex: 1,
                                backgroundColor: "#1f84f5",
                                borderRadius: 20,
                                margin: 5,
                                padding: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',

                            }}>
                            <View style={{ flex: 0.2, }}>
                                <Svg name="ubicacion"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        fill: "#ffffff"

                                    }} />
                            </View>
                            <Text style={{
                                color: "#ffffff",
                                fontSize: 12,
                                flex: 2,
                                margin: 5,
                            }}>{obj.direccion}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    const repuestaText = () => {
        if (mostrar.estado) {
            return mostrar.textOcultar
        }__con
        return mostrar.textMostrar
    }
    return (
        <View
            style={{
                flex: 1,
                width: "80%",
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                position: 'absolute',
                top: 70,
            }}>
            <TouchableOpacity
                onPress={() => {
                    if (!mostrar.estado) {
                        mostrar.estado = true
                        setMostrar({ ...mostrar })
                        return <View />
                    }
                    mostrar.estado = false
                    setMostrar({ ...mostrar })
                }}
                style={{
                    width: 100,
                    height: 35,
                    borderRadius: 20,
                    backgroundColor: "#1f84f5",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{ color: "#fff" }}>
                    {repuestaText()}
                </Text>
            </TouchableOpacity>
            {ModeloLista()}


        </View>
    )

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ListaBusqueda);
