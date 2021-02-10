import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import ImgFondoCruces from '../ImgFondoCruces';

const EsperarFoto = (props) => {
    if (!props.state.usuarioReducer.usuarioDatos["Codigo seguro"]) {
        return <View />
    }
    return (
        <View style={styles.container}>
            <ImgFondoCruces />
            <View style={{
                height: 200,
                backgroundColor: "#2C4C7E",
                borderRadius: 20,
                width: "80%",
                marginTop: 40,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text style={{
                    fontSize: 23,
                    color: '#fff',
                    marginStart: 30,
                    marginEnd: 30,
                    fontWeight: "bold",
                    textAlign: "center"
                }}>ESPERANDO VERIFICACIÓN DEL SEGURO</Text>

                <Text style={{
                    color: "#fff"
                }}>Codigo: {props.datos["Codigo seguro"].dato}</Text>
                <Text style={{
                    color: "#fff"
                }}>Seguro: {props.datos["Tipo seguro"].dato} </Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // justifyContent:"center",
        alignItems: "center"
    },
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(EsperarFoto);

