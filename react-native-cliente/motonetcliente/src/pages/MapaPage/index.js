import React, { Component } from 'react';
import { View, Text } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export default class MapaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position:{}
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#000",
                alignItems:"center"
            }}>
                <MapView style={{
                    width: "100%",
                    height: "100%",
                }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    loadingEnabled={true}
                    onUserLocationChange={({nativeEvent : evt }) => {
                        // console.log(coordinate.coordinate);
                        this.state.position = evt.coordinate;
                        this.setState({...this.state});
                    }}
                >

                </MapView>

                <View style={{
                    position:"absolute",
                    width:300,
                    top:10,
                    backgroundColor:"#fff",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <Text>Position:</Text>
                    <Text>latitude:</Text>
                    <Text>{this.state.position.latitude}</Text>
                    <Text>longitude:</Text>
                    <Text>{this.state.position.longitude}</Text>
                    <Text>altitude:</Text>
                    <Text>{this.state.position.altitude}</Text>
                    <Text>heading:</Text>
                    <Text>{this.state.position.heading}</Text>
                    <Text>accuracy:</Text>
                    <Text>{this.state.position.accuracy}</Text>
                    <Text>speed:</Text>
                    <Text>{this.state.position.speed}</Text>
                    <Text>timestamp:</Text>
                    <Text>{new Date(this.state.position.timestamp).toLocaleString()}</Text>
                </View>
            </View>
        );
    }
}
