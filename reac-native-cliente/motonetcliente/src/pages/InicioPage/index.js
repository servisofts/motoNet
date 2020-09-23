import React, { Component } from 'react';
import * as mapaActions from '../../Actions/mapaActions'
import * as locationActions from '../../Actions/locationActions'
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
        var mapa;
        if (!zoom) {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const yourFunction = async () => {
                await delay(1500);
                //zoomin(currentPos)
            };
            yourFunction();
        }
        const getMarkersAll = () => {
            return arrPos.map((obj, key) => {
                return (
                    <Marker
                        coordinate={obj}
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
            })
        }
        //??
        if (!arrPos) {
            var arr = [];
            for (let i = 0; i < 10; i++) {
                var max = 0;
                var min = 0;
                var lat = Math.random() * ((region.latitude - 0.008) - (region.latitude + 0.008)) + (region.latitude + 0.008);
                var lng = Math.random() * ((region.longitude - 0.008) - (region.longitude + 0.008)) + (region.longitude + 0.008);
                arr.push({
                    latitude: lat,
                    longitude: lng
                })
            }
            setarrPos(arr);
            return <View />
        }

        const getMarker = () => {
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
        }

        const markerClick = (obj) => {
            console.log(obj);
            if (!zoom)
                zoomin(obj);
            else
                zoomout(obj);
        }

        const zoomin = (obj) => {
            obj = currentPos;

            obj = {
                latitude: obj.latitude,
                longitude: obj.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }
            mapa.animateToRegion(obj, 2000);
            setZoom(true);
            return <View />
        }

        const zoomout = (obj) => {
            obj = {
                latitude: obj.latitude,
                longitude: obj.longitude,
                latitudeDelta: 17,
                longitudeDelta: 17
            }
            mapa.animateToRegion(obj, 3000);
            setZoom(false);
        }

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={region}

                    ref={map => { mapa = map }}
                >
                    {getMarker()}
                    {getMarkersAll()}
                </MapView>

                {/* {ModeloComponent()} */}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    yo: {
        width: 35,
        height: 35,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "red",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    container: {
        flex: 1,
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: "100%",
    },
    buttOn1: {
        borderRadius: 10,
        backgroundColor: "#4fc2ef",
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttOn2: {
        width: 200,
        height: 60,
        borderRadius: 10,
        backgroundColor: "red",
        position: "absolute",
        bottom: 200,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
    },
    icono: {

        width: 65,
        height: 65,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "#4fc2ef",
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
        left: 10,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});

const initActions = ({
    ...mapaActions,
    locationActions
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(InicioPage);
