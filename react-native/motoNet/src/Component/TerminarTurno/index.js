import React from 'react';
import { connect } from 'react-redux';

import { View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
const TerminarTurno = (props) => {
    if (!props.state.backgroundLocationReducer.isOpen) {
        return <View />
    }
    return (
        <View style={{
            position: "absolute",
            right: 20,
            top: 10
        }}>
            <TouchableOpacity
                onPress={() => {
                    props.state.backgroundLocationReducer.close()
                }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    backgroundColor: "#f00",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{ color: "#fff",fontSize: 10,fontWeight: 'bold', }} >
                    TERMINAR TURNo
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TerminarTurno);
