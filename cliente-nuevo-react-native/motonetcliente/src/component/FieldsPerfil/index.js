import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LineHorizontal from '../LineHorizontal'

const FieldsPerfil = ({ datos }) => {

    if (!datos) {
        console.log(datos)
        return <Text>No hay datos</Text>
    } else {
        console.log(datos)
    }


    return (

        <View>
            <View style={styles.ContenedorCampos}>
                <Text style={styles.TextTitulo}>Nombre</Text>
                <Text style={styles.TextCampo}>
                    {!datos["Nombres"].dato ? "" : datos["Nombres"].dato}
                </Text>
            </View>

            <View style={styles.line}>
                <LineHorizontal />
            </View>

            <View style={styles.ContenedorCampos}>
                <Text style={styles.TextTitulo}>Apellidos</Text>
                <Text style={styles.TextCampo}>{datos["Apellidos"].dato}</Text>
            </View>

            <View style={styles.line}>
                <LineHorizontal />
            </View>

            <View style={styles.ContenedorCampos}>
                <Text style={styles.TextTitulo}>Correo</Text>
                <Text style={styles.TextCampo}>{datos["Correo"].dato}</Text>
            </View>

            <View style={styles.line}>
                <LineHorizontal />
            </View>

            <View style={styles.ContenedorCampos}>
                <Text style={styles.TextTitulo}>Telefono</Text>
                <Text style={styles.TextCampo}>{datos["Telefono"].dato}</Text>
            </View>

            <View style={styles.line}>
                <LineHorizontal />
            </View>

            {/* <View style={styles.ContenedorCampos}>
                <Text style={styles.TextTitulo}>Edad</Text>                
                <Text style={styles.TextCampo}>{!datos["Fecha de nacimiento"].dato ? "" : datos["Fecha de nacimiento"].dato}</Text>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    TextTitulo: {
        marginBottom: 2,
        color: "red"
    },
    TextCampo: {
        fontSize: 20,
        color:"#000"
    },
    line: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    ContenedorCampos: {
        marginBottom: 10,        
    }
});

export default FieldsPerfil

