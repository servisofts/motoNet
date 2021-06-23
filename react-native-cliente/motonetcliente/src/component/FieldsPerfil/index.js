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

        <View style={{
            width: "100%"
        }}>
            <Text style={{
                color: "#000",
                fontSize: 16,
                marginBottom: 4,
                marginTop: 10,
                fontWeight: "bold"
            }}>Información personal</Text>
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

            <Text style={{
                color: "#000",
                fontSize: 16,
                marginTop: 10,
                marginBottom: 4,
                fontWeight: "bold"
            }}>Información de contacto</Text>
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
        fontSize: 12,
        color: "#222222"
    },
    TextCampo: {
        fontSize: 16,
        color: "#000"
    },
    line: {
        marginBottom: 10
    },
    ContenedorCampos: {
        marginBottom: 8,
    }
});


export default FieldsPerfil

