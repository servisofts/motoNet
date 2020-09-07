
import React from 'react';
import {
    View,
    Text,

} from 'react-native';
import { connect } from 'react-redux';

const Ayuda = (props) => {

    return (

        <View style={{
            height: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ alignItems: 'center', fontWeight: 'bold', color: '#000' }}>Estamos en etapa de desarrollo.</Text>
                <Text style={{ alignItems: 'center', fontWeight: 'bold', color: '#000' }}>Esperamos su comprencion</Text>
            </View>
        </View>
    );

}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Ayuda);
