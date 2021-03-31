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
            top: 400
        }}>
            <TouchableOpacity
                onPress={() => {
                    props.state.backgroundLocationReducer.close()
                }}
                style={{
                    width: 200,
                    height: 50,
                    borderRadius: 20,
                    backgroundColor: "#f00",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold', }} >
                    Desactivarse
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TerminarTurno);
