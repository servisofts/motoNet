import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationApps, actions, googleMapsTravelModes, mapsTravelModes } from "react-native-navigation-apps";
import { connect } from 'react-redux';

class SNavigationApps extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // console.log("-------------"+props.key_parqueo)
        // console.log(props.state.parqueoReduer.data[props.key]);
        this.latLng = {
        }
    }
    render() {
        // console.log("-------------"+this.props.key_parqueo)
        var data = this.props.state.ViajeReducer.data;
        if (!data) {
            return <ActivityIndicator color={"#000"} />
        }
        var direccion = data.direccion_inicio;
        if (direccion) {
            this.latLng = {
                lat: direccion.latitude,
                lon: direccion.longitude,
                addres: direccion.direccion
            }
            // console.log(this.latLng)
        }
        return (
            <NavigationApps
                iconSize={40}
                viewContainerStyle={{
                    minWidth: 100,
                    justifyContent: "space-evenly",
                }}
                row
                waze={{ lat: this.latLng.lat, lon: this.latLng.lon, action: actions.navigateByLatAndLon }} // specific settings for waze
                googleMaps={{ lat: this.latLng.lat, lon: this.latLng.lon, action: actions.navigateByLatAndLon, travelMode: googleMapsTravelModes.driving }} // specific settings for google maps
            // maps={{   lat: this.latLng.lat, lon: this.latLng.lon, action: actions.navigateByLatAndLon, travelMode: mapsTravelModes.driving }} // specific settings for maps
            />
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SNavigationApps);