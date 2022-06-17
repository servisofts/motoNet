import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { Marker } from 'react-native-maps';
import MarkerIcon from '../../../img/motomarker.svg';

class MarkerAmbulancia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cordinates: {
                latitude: 0,
                longitude: 0
            }
        };
    }
    render() {
        var position = this.props.state?.posicionConductorReducer?.posicion;
        if (!position) {
            return <View />
        }
        this.latLng = {
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        }

        var time = 1000;
        // if (!this.lastPos) {
        //     this.lastPos = this.latLng;
        //     this.deegre = position.deegre;
        // } else {
        //     var distance = this.getDistanceFromLatLonInKm(this.lastPos.latitude, this.lastPos.longitude, this.latLng.latitude, this.latLng.longitude);
        //     if (distance > 0.1) {
        //         this.deegre = position.deegre;
        //     }
        //     this.lastPos = this.latLng;
        // }
        if (this.marker) {
            this.marker.animateMarkerToCoordinate(this.latLng, time);
        }
        // this.lastPos = position;
        return (
            <Marker.Animated
                ref={ref => { this.marker = ref }}
                flat={true}
                coordinate={this.state.cordinates}
                rotation={position.deegre ?? 0}
                tracksViewChanges={false}
            >
                <MarkerIcon style={{
                    width: 50,
                    height: 50,
                    fill: "#fff",
                }} />
            </Marker.Animated>
        );
    }
}
export default MarkerAmbulancia;