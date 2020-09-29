import React from 'react';

import { View, ActivityIndicator ,Text} from 'react-native';

const Estado = (props) => {
    return (
        <View style={{ flex: 1, width: "100%",alignItems: 'center', justifyContent: 'center',backgroundColor: "red", }}>
            <Text style={{ color: "#fff", margin: 5 }}>{props.estado}</Text>
            <ActivityIndicator size="small" color="#fff" /></View>
    )
}
export default Estado;
