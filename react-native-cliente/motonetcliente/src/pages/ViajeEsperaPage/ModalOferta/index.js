import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Boton1 from '../../../component/Boton1'

const ModalOferta = (props) => {
    return (
        <View style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "#00000050",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{
                width: 300,
                height: 250,
                backgroundColor: "#fff",
                borderRadius: 20
            }}>

                <View>
                    <Text>Condutor</Text>
                </View>

                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "#ccc"
                }}>

                    <View style={{
                        // flex: 1,
                        width: 100
                    }}>
                        <Boton1
                            label="Aceptar"
                            type="1"
                            onPress={() => { alert("dsd") }}
                            cargando={false} />
                    </View>

                    <View style={{
                        // flex: 1,
                        width: 100
                    }}>
                        <Boton1
                            label="Buscar Otro"
                            type="4"
                            onPress={() => { alert("dsd") }}
                            cargando={false} />
                    </View>

                </View>
            </View>
        </View>
    )
}

export default ModalOferta