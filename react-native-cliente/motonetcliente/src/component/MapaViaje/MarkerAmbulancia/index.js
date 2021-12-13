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
        var position = this.props.state.posicionConductorReducer.posicion;
        if (!position) return null;
        this.latLng = {
            latitude: position.latitude,
            longitude: position.longitude
        }

        var time = 1000;
        if (this.lastPos) {
            // time = new Date(position.fecha_on).getTime() - new Date(this.lastPos.fecha_on).getTime();
            // time=time/2;
        }
        if (this.marker) {
            this.marker.animateMarkerToCoordinate(this.latLng, time);
        }
        this.lastPos = position;
        return (
            <Marker.Animated
                ref={ref => { this.marker = ref }}
                flat={true}
                coordinate={this.state.cordinates}
                rotation={position.deegre}

            >
                <MarkerIcon
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#fff",
                    }} />
            </Marker.Animated>
        );
    }
}
export default MarkerAmbulancia;