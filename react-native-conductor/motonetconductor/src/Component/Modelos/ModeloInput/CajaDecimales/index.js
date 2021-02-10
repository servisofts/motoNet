import React from 'react';
import { View, TextInput, Text } from 'react-native';
const CajaDecimales = (props) => {


    const hanlechage = (text, id) => {

        var value = text.replace(/[0-9]+(\.[0-9][0-9]?)?/g, "")
        props.hanleDecimales(value, id)

    };


  


    return (
        <View style={{
            flex: 1,
            width: '100%',
            marginTop: 15,
        }}>
            <Text
                style={props.tituloInput}>{props.info_tabla.column_name}</Text>
            <TextInput
                onChangeText={text => hanlechage(text, props.column_name)}
                style={(props.style)}
                value={props.info_tabla.value}

            />
        </View>
    );
}
export default CajaDecimales;