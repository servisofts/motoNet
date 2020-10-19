import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';
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
    const repuestaText = () => {
        if (mostrar.estado) {
            return mostrar.textOcultar
        }
        return mostrar.textMostrar
    }
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
                                props.onchage(obj)
                            }}
                            style={{
                                width: "100%",
                                height: 50,
                                flex: 1,
                                backgroundColor: "#fff",
                                borderRadius: 20,
                                margin: 5,
                                padding: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                borderColor:"#f00",
                                borderWidth:1,

                            }}>
                            <View style={{ flex: 0.2, }}>
                                <Svg name="ubicacion"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        fill: "#f00"

                                    }} />
                            </View>
                            <Text style={{
                                color: "#000",
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
                    backgroundColor: "#f00",
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
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
