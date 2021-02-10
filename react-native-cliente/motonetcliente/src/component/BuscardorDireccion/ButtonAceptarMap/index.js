import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Svg from '../../../Svg'
import { connect } from 'react-redux';
import * as locationActions from '../../../action/locationActions'

const ButtonAceptarMap = (props) => {
    const [data, setData] = React.useState({
        dataUbicacion: false,
    })

    if (!props.state.locationGoogleMapReducer.data) {
        return <View/>
    }
    if (!props.state.locationGoogleMapReducer.data.direccion) {
        return <View/>
    }
    // if (!props.state.locationGoogleMapReducer.estado == ) {
        // return <View/>
    // }
    return (
        <View style={{
            position: "absolute",
            width: "100%",
            bottom: 10,
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center"
        }}>
            <TouchableOpacity
                onPress={() => {
                    // props.repuestaUbicacion({
                    //     latitude: data.dataUbicacion.latitude,
                    //     longitude: data.dataUbicacion.longitude,
                    //     altitude: 0,
                    //     timestamp: new Date().getTime(),
                    //     accuracy: 0,
                    //     altitudeAccuracy: 0,
                    //     speed: 0,
                    // })
                    props.navigation.replace("ConfirmarPageAux");
                    return <View />
                }}
                style={{
                    width: "90%",
                    height: 60,
                    borderWidth: 2,
                    borderRadius: 100,
                    borderColor: "#fff",
                    backgroundColor: '#2C4C7E',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                {/* <Svg name="guardar"
                    style={{
                        width: 30,
                        height: 30,
                        fill: "#ffffff"

                    }} /> */}
                <Text style={{
                    color: "#fff",
                    fontSize: 18,
                }}>
                    CONFIRMAR UBICACIÓN
                    </Text>
            </TouchableOpacity>
        </View>
    )
}
// const initActions = ({
//     ...locationActions,
// });
const initStates = (state) => {
    return { state }
};


export default connect(initStates)(ButtonAceptarMap);

// export default connect(initStates, initActions)(ButtonAceptarMap);
