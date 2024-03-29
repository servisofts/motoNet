import React from 'react';
import { View, Text, TextInput } from 'react-native';


const CajaCharacter = (props) => {



    const hanlechage = (text, id) => {


        props.hanleCharater(text, id)

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
                onChangeText={text => hanlechage(text, props.info_tabla.column_name)}
                style={(props.style)}
                value={props.info_tabla.value}
            />
        </View>
    );
}
export default CajaCharacter;