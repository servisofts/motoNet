import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, DatePickerIOS, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
// import MarkerAmbulancia from './MarkerAmbulancia';
var mapa;

const Mapa = (props) => {
    const [data, setdata] = React.useState({
        region: {
            latitude: -17.78629,
            longitude: -63.18117,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
            isRender: false,
        },
        origen: false,
        ubicacionActual: false
    })
    // var pos = props.state.locationGoogleMapReducer.region;
    var pos = props.state.viajesReducer.data.destinos[0];
    console.log(pos)
    if (!data.region.isRender) {
        if (pos) {
            data.region = {
                latitude: pos.latitude,
                longitude: pos.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
                isRender: true,
            }
            setdata({ ...data });
        }
        return <View />
    }
    const getMarkerInicio = () => {
        // if (!props.state.emergenciaReducer.data) {
        //     return <View />
        // }
        // var dato = props.state.viajesReducer.data.destinos[0];
        console.log(data)
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
            <MapView
                style={{
                    flex: 1,
                    width: '100%',
                    height: "100%",
                }}
                // ref={map => { mapa = map }}
                // showsUserLocation={true}
                initialRegion={data.region}>
                {/* {getMarkerOrigen()}
                {getMarkerFin()} */}

                {getMarkerInicio()}
                {/* <MarkerAmbulancia /> */}
                {/* {getPosicionConductor()} */}

                {/* <RutaViaje ventanaSelect={props.ventanaSelect} setVentanaSelect={props.setVentanaSelect} /> */}

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
