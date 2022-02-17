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
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    render() {
        var position = this.props.state.posicionConductorReducer.posicion;
        if (!position) return null;
        this.latLng = {
            latitude: position.latitude,
            longitude: position.longitude
        }

        var time = 1000;
        if (!this.lastPos) {
            this.lastPos = this.latLng;
            this.deegre = position.deegre;
        } else {
            var distance = this.getDistanceFromLatLonInKm(this.lastPos.latitude, this.lastPos.longitude, this.latLng.latitude, this.latLng.longitude);
            if (distance > 0.1) {
                this.deegre = position.deegre;
            }
            this.lastPos = this.latLng;
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
                rotation={this.deegre}

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