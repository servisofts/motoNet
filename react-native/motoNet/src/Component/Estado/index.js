import React from 'react';


const Estado = (props) => {
    return (
        <View style={{ flex: 1, width: "100%", alignItems: 'center', justifyContent: 'center', backgroundColor: "red", }}>
            <Text style={{ color: "#fff", margin: 5 }}>{props.estado}</Text>
            <ActivityIndicator size="small" color="#fff" /></View>
    )
}
export default Estado;
