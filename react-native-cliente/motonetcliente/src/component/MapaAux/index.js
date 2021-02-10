import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, DatePickerIOS, } from 'react-native';
import Svg from '../../Svg';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

var mapa;
const Mapa = (props) => {
    var pos = props.state.locationEmergenciaReducer.region;

    const [data, setdata] = React.useState({
        region: {
            latitude: pos.latitude,
            longitude: pos.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
            isRender: false,
        },
        origen: false,
        ubicacionActual: false
    })


    const getMarkerInicio = () => {
        // if (!props.state.emergenciaReducer.data) {
        //     return <View />
        // }
        // var dato = props.state.emergenciaReducer.data.destinos[0];
        var json = { latitude: data.region.latitude, longitude: data.region.longitude };
        return (
            <Marker
                coordinate={json}
            // resizeMode=""
            >
                {/* <View style={{
                    //  width: 50,
                    //  height: 50,
                    justifyContent:"center",
                    alignItems:"center",
                   
                     backgroundColor:"#ccc"
                }}> */}
                {/* <Svg name="Milocation"
                    style={{
                        width: 50,
                        height: 50,
                    }} /> */}
                {/* </View> */}

            </Marker>
        )
    }


    return (
        <View style={{ width: "100%", height: "100%" }}>
            < MapView
                style={{
                    flex: 1,
                    width: '100%',
                    height: "100%",
                }}
                // ref={map => { mapa = map }}
                showsUserLocation={true}
                initialRegion={data.region}>
                {/* {getMarkerOrigen()}
                {getMarkerFin()} */}

                {getMarkerInicio()}

            </MapView >
            {/* <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: 200,
                    right: 10
                }}
                onPress={() => {
                    data.region = { isReder: false };
                    setdata({ ...data })
                    return <View />
                }}
            >
                <Svg name="Gps"
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#f00"
                    }} />
            </TouchableOpacity> */}
        </View>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Mapa);
