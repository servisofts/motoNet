import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg from '../../../Svg';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

const Mapa = (props) => {
    const data = React.useState({
        region: {
            latitude: -17.7799998333333332,
            longitude: -63.180598333333336,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
        },
        origen: false,
        destino: false
    })

    const getMarkerDestino = () => {
        if (!data.destino) {
            return <View />
        }

        
        return (
            <Marker
                coordinate={data.destino}
            >
                <Svg name="MarkerMoto"
                    style={{
                        width: 25,
                        height: 25,
                        fill: "#fff"

                    }} />
            </Marker>
        )

    }

    const getMarkerOrigen = () => {
        if (!data.origen) {
            return <View />
        }
        return (
            <Marker
                coordinate={data.origen}
            >
                <TouchableOpacity
                    style={styles.yo}>

                    <Svg name="MarkerMoto"
                        style={{
                            width: 25,
                            height: 25,
                            fill: "#fff"

                        }} />
                </TouchableOpacity>

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
                data.origen = region
                props.state.socketClienteReducer.sessiones["motonet"].send({
                    component: "locationGoogle",
                    type: "geocode",
                    data: region,
                    estado: "cargando"
                }, true);
            }}
        >
            {!props.state.locationGoogleMapReducer.listaBusqueda ? (
                getMarkerOrigen()) : (
                    <View />
                )}

        </MapView>
    )
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Mapa);
