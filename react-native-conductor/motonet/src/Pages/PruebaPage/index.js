import React, { Component } from 'react';
import { connect } from 'react-redux';

import Mapa from '../../Component/Inicio/Mapa';
import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';


class PruebaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);

    }
    render() {
        const getBtnLocation = () => {
            var mensaje = "";
            if (!this.props.state.backgroundLocationReducer.isOpen) {
                mensaje = "OPEN";
            }else{
                mensaje = "CLOSE";
            }
            return (
                <TouchableOpacity style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#000",
                    position: "absolute",
                    top: 10,
                    right: 10,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                    onPress={() => {
                        if (!this.props.state.backgroundLocationReducer.isOpen) {
                            this.props.state.backgroundLocationReducer.open()
                        }else{
                            this.props.state.backgroundLocationReducer.close()
                        }
                    }}
                >
                    <Text style={{
                        color: "#fff"
                    }}>{mensaje}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: "#000000",
            }}>
                <Mapa />
                {getBtnLocation()}
            </View>


        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(PruebaPage);
