import React, { Component } from 'react';
import * as mapaActions from '../../action/mapaActions'
import * as locationActions from '../../action/locationActions'
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Svg from '../../Svg';

export class InicioPage extends Component {

    constructor(props) {
        super()
        this.state = {
            region: {
                latitude: -17.7799998333333332,
                longitude: -63.180598333333336,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
            }
        }
    }

    render() {
        /*   if (!props.state.locationReducer.isOpen) {
         props.state.locationReducer.open();
         return <View></View>
     }    */

        // marca las posicion 
        /* const getMarker = () => {
            if (!props.state.locationReducer.data) {
                return <View />
            }
            var data = props.state.locationReducer.data;
            return (
                <Marker
                    coordinate={{
                        latitude: data.latitude,
                        longitude: data.longitude
                    }}
                >
                    <TouchableOpacity
                        style={styles.yo}>

                        <Svg name="Logo"
                            style={{
                                width: 25,
                                height: 25,
                                fill: "#fff"

                            }} />
                    </TouchableOpacity>
                </Marker>
            )
        } */

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    ref={map => { mapa = map }}
                >
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: "100%",
    },

    buscar: {
        width: 250,
        height: 50,
        borderColor: "#00000022",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "#FFF",
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top: 20,
        left: 90,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});

const initActions = ({
    ...mapaActions,
    locationActions
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(InicioPage);