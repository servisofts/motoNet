import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SBLocation, Data } from 'servisofts-background-location'

export default class Mapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    } ƒ

    render() {
        if (this.mapa) {
            var posicionConductor = Data.lastLocation
            if (posicionConductor) {
                if (posicionConductor.latitude != 0 && posicionConductor.longitude != 0) {
                    this.mapa.animateToRegion({
                        latitude: posicionConductor.latitude,
                        longitude: posicionConductor.longitude,
                        latitudeDelta: 0.007,
                        longitudeDelta: 0.007
                    }, 1000)
                }
            }
        }

        return (
            <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
            }}>
                <MapView
                    style={{
                        width: "100%",
                        flex: 1,
                    }}
                    initialRegion={{
                        latitude: -17.7799998333333332,
                        longitude: -63.180598333333336,
                        latitudeDelta: 0.07,
                        longitudeDelta: 0.07,
                    }}
                    ref={ref => { this.mapa = ref }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                // showsMyLocationButton={true}
                >
                </MapView>
            </View>
        );
    }
}
