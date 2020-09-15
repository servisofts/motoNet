import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    ScrollView,
    StyleSheet
} from 'react-native';

import Inicio from '../../Component/Inicio';
import Svg from '../../Svg';
class InicioPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
                flex: 1,
                width: "100%",
                justifyContent: 'center',
            }}>
                <Inicio navigation={this.props.navigation} />
                <View style={{
                    width: "100%",
                    height: 60,
                    position: "absolute",
                    bottom: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ScrollView
                        horizontal={true} style={{
                            flex: 1,
                        }}>
                        <View style={styles.view}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("PedirMotoPage")
                                    return <View />
                                }}
                                style={styles.touchableOpacity}>
                                <Svg name="MarkerMoto"
                                    style={{
                                        width: 35,
                                        height: 35,

                                    }} />
                                <Text style={styles.text}> Pedir Moto</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.view}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("PedirMotoPage")
                                    return <View />
                                }}
                                style={styles.touchableOpacity2}>
                                <Svg name="MarkerMoto"
                                    style={{
                                        width: 35,
                                        height: 35,

                                    }} />
                                <Text style={styles.text2}> Pedir torito</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.view}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("PedirMotoPage")
                                    return <View />
                                }}
                                style={styles.touchableOpacity3}>
                                <Svg name="MarkerMoto"
                                    style={{
                                        width: 35,
                                        height: 35,
                                    }} />
                                <Text style={styles.text3}> Pedir carro</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
            </View>


        );
    }
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: 350,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableOpacity: {
        width: 200,
        height: 50,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableOpacity2: {
        width: 200,
        height: 50,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },
    touchableOpacity3: {
        width: 200,
        height: 50,
        borderRadius: 20,
        backgroundColor: "#424242",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    },
    text2: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 20
    },
    text3: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    },
})
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(InicioPage);
