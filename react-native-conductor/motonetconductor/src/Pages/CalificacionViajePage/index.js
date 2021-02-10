import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    AsyncStorage
} from 'react-native';

class CalificacionViajePage extends Component {
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
                alignItems: 'center',
            }}>
                <Text>Calificacion Page</Text>
                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#f00",
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                    onPress={() => {
                        AsyncStorage.removeItem("motonet_viaje");
                        this.props.state.ViajeReducer.data = false;
                        this.props.navigation.replace("CargaPage");
                    }}
                >
                    <Text style={{ color: "#fff" }}>Omitir</Text>
                </TouchableOpacity>
            </View>
        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(CalificacionViajePage);
