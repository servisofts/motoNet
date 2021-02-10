import React from 'react';

import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

const Consola = (props) => {
    const [mensaje, setMensaje] = React.useState("")
    const hanlechage = (text) => {
        setMensaje(text)
        return <View />
    };
    const enviar = () => {
        var Console = {
            component: "console",
            type: "mensaje",
            data: mensaje,
            estado:"cargando"
        };
            props.state.consoleReducer.client(Console);
        

        setMensaje("");

        return <View />

    }


    return (

        <View
            style={{
                flex: 1,
                width: '100%',
            }}>

            <ScrollView
                style={{
                    flex: 1,
                    width: '100%',
                }}>
                <View
                    style={{
                        width: "100%",
                    }}>
                    {
                        props.state.consoleReducer.data.map((obj, key) => {
                            return (
                                <Text key >
                                    {obj}
                                </Text>
                            )
                        })
                    }

                </View>

            </ScrollView >
            <View
                style={{
                    width: '100%',
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TextInput
                    onChangeText={text => hanlechage(text)}
                    value={mensaje}
                    style={{
                        margin: 5,
                        flex: 1,
                        borderWidth: 3,
                        borderRadius: 10,
                    }} />
                <TouchableOpacity
                    onPress={enviar}
                    style={{
                        flex: 0.2,
                        width: 60,
                        height: 55,
                        borderRadius: 10,
                        margin: 2,
                        backgroundColor: '#000',
                        borderWidth: 2,
                    }}>

                </TouchableOpacity>
            </View>
        </View>

    )


}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Consola);



