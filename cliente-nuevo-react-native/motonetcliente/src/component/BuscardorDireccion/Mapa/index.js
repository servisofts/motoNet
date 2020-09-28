import React from 'react';
import { View, TouchableOpacity, } from 'react-native';
import Svg from '../../../Svg';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
const Mapa = (props) => {


    const [data, setdata] = React.useState({
        region: {
            latitude: -17.7799998333333332,
            longitude: -63.180598333333336,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
        },
        origen: false,
        ubicacionActual: false
    })


    const getMarkerOrigen = () => {

        if (!props.state.locationGoogleMapReducer.markerUbicacion) {
            return <View />
        }

        var locoation = { latitude: props.state.locationGoogleMapReducer.markerUbicacion.latitude, longitude: props.state.locationGoogleMapReducer.markerUbicacion.longitude };
        return (
            <Marker
                coordinate={locoation}
            >
                <Svg name="Logo"
                    style={{
                        width: 25,
                        height: 25,
                        fill: "#000"

                    }} />

            </Marker>
        )
    }

    return (
        <MapView
            style={{
                flex: 1,
                width: '100%',
                height: "100%",
            }}

            initialRegion={data.region}
            onRegionChangeComplete={(region) => {
                props.state.socketClienteReducer.sessiones["motonet"].send({
                    component: "locationGoogle",
                    type: "geocode",
                    data: region,
                    estado: "cargando"
                }, true);
                return <View />
            }}
        >
            {getMarkerOrigen()}
        </MapView>
    )
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Mapa);
