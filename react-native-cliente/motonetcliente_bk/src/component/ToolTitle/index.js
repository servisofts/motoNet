import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

const ToolTitle = (props) => {
    return (
        <View style={{
            backgroundColor: "#2C4C7E",
            // minHeight: Dimensions.get('window').height * 0.08,
            minHeight: 50,
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        }}>
            <Text style={{
                // fontSize: Dimensions.get('window').height * 0.025,
                fontSize: 20,
                textAlign: "center",
                color: "#fff",
                // fontStyle: "italic",
                fontWeight: "bold",
                padding: 5
            }}> {props.name}
            </Text>
        </View>
    )
}

export default ToolTitle


