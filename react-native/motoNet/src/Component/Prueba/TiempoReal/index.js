import React from 'react';

import {
    View,
    NativeModules,
    NativeEventEmitter,
    TouchableOpacity,
    Text
} from 'react-native';
const TiempoReal = (props) => {
    const [data, setData] = React.useState({
        repuesta: "",
        cantidad: 0
    })



    const start = () => {
        NativeModules.Geolocation.start((name) => {
            const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
            var eventListener = eventEmitter.addListener('onLocationChange', (event) => {
                data.repuesta = event.data
                data.cantidad++;
                setData({ ...data })
                return <View />
            });
        })


    }

    const parar = () => {
        NativeModules.Geolocation.stop((name) => {
            alert(name)
            data.repuesta = "Termino Carrera"
            setData({ ...data })
            return <View />

        })
    }
    return (

        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <TouchableOpacity
                onPress={start}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    borderWidth: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "green",

                }}>
                <Text>comenzar</Text>
            </TouchableOpacity>
            <Text
                style={{
                    fonSize: 15,
                    textAlign: "center"
                }}>
                {JSON.stringify(data)}
            </Text>
            <TouchableOpacity
                onPress={parar}
                style={{
                    marginTop: 50,
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "red",
                }}>
                <Text> Parar   </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TiempoReal;
