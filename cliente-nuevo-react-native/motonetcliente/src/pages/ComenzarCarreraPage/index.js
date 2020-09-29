import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet
} from 'react-native';
import * as viajesActions from '../../action/viajesActions'
import Svg from '../../Svg';
import MapView from 'react-native-maps';

class ComenzarCarreraPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -17.7799998333333332,
                longitude: -63.180598333333336,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
            }
        };

    }
    render() {
        return (
            <View style={{
                flex: 1,

            }}>
                <MapView
                    style={{
                        flex: 1,
                    }}
                    initialRegion={this.state.region}
                >

                </MapView>
                <View style={{
                    width: "80%",
                    height: "20%",
                    position: "absolute",
                    bottom: 10,
                    left: "10%",
                    borderRadius: 5,
                    backgroundColor: "red",
                    alignItems: 'center',
                }}>
                    <View style={{
                        flex: 0.4,
                        width: "100%",
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            color: "#fff",
                            flex: 1,
                            textAlign: "center"

                        }}>Su moto esta en camino</Text>
                        <Svg name="Logo"
                            style={{
                                position: "absolute",
                                right: 10,
                                width: 25,
                                height: 25,
                                fill: "#f00"

                            }} />
                    </View>
                    <View style={{
                        flex: 0.7,
                        width: "100%",
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            flex: 1,
                            margin: 5,
                            flexDirection: 'row',
                        }}>
                            <View
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 100,
                                    backgroundColor: "#fff",
                                }}>

                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                            }}>
                                <Text>{this.props.state.usuarioReducer.usuariolog.nombre}</Text>

                            </View>

                        </View>
                        <View style={{
                            borderWidth: 2,
                            flex: 1,
                        }}>

                        </View>
                    </View>
                </View>

            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        flex: 1,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
});
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...viajesActions
});


export default connect(initStates, initActions)(ComenzarCarreraPage);


