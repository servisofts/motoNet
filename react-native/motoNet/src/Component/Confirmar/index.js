import React from 'react';
import { View, Text, TouchableHighlight, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const Confirmar = (props) => {
    
    const onConfirmar = () => {
        Alert.alert(
            '',
            'Confirmar Carrera',
            [{
                text: 'Aceptar',
                onPress: (aceptar.bind(this))
            },
            {
                text: 'Cancelar',
                onPress: (cancelar.bind(this))
            }]
        )
    }

    const aceptar = () => {
        console.log('Carrera Confirmada')
    }
    const cancelar = () => {
        console.log('Carrera Cancelada')
    }

    return (

        <View style={{
            height: "100%",
            flex: 1,
            justifycontent: "center",
            alignitems: "center",
        }}>

            <TouchableHighlight onPress={(onConfirmar.bind(this))} style={estilos.boton}>
                <Text style={estilos.textoBoton}>Confirmar</Text>
            </TouchableHighlight>

            <View style={{ width: '100%', justifycontent: 'center', alignitems: 'center', }}>
                <Text style={{ alignitems: 'center', fontweight: 'bold', color: '#000' }}>estamos en etapa de desarrollo.</Text>
                <Text style={{ alignitems: 'center', fontweight: 'bold', color: '#000' }}>esperamos su comprencion</Text>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    boton: {
        width: 300,
        height: 30,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1
    },
    textoBoton: {
        color: 'white'
    }
})

const initstates = (state) => {
    return { state }
};
export default connect(initstates)(Confirmar);
