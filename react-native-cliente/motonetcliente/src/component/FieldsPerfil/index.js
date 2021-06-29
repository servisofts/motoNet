import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import Svg from '../../Svg'
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
                <TouchableOpacity style={styles.edit_content}>
                    <Text style={styles.TextCampo}>
                        {!datos["Nombres"].dato ? "" : datos["Nombres"].dato}
                    </Text>
                    <Svg resource={require("../../img/edit.svg")} style={{
                        width: 20,
                        height: 20,
                    }} />
                </TouchableOpacity>
            </View>

            <View style={styles.line}>
                <LineHorizontal />
            </View>

            <View style={styles.ContenedorCampos}>
                <Text style={styles.TextTitulo}>Apellidos</Text>
                <TouchableOpacity style={styles.edit_content}>
                    <Text style={styles.TextCampo}>{datos["Apellidos"].dato}</Text>
                    <Svg resource={require("../../img/edit.svg")} style={{
                        width: 20,
                        height: 20,
                    }} />
                </TouchableOpacity>
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
                <TouchableOpacity style={styles.edit_content}>
                    <Text style={styles.TextCampo}>{datos["Correo"].dato}</Text>
                    <Svg resource={require("../../img/edit.svg")} style={{
                        width: 20,
                        height: 20,
                    }} />
                </TouchableOpacity>

            </View>

            <View style={styles.line}>
                <LineHorizontal />
            </View>

            <View style={styles.ContenedorCampos}>
                <Text style={styles.TextTitulo}>Telefono</Text>
                <TouchableOpacity style={styles.edit_content}>
                    <Text style={styles.TextCampo}>{datos["Telefono"].dato}</Text>
                    <Svg resource={require("../../img/edit.svg")} style={{
                        width: 20,
                        height: 20,
                    }} />
                </TouchableOpacity>
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
        flex: 1,
        fontSize: 16,
        color: "#000"
    },
    line: {
        marginBottom: 10
    },
    ContenedorCampos: {
        marginBottom: 8,
    },
    edit_content: {
        flexDirection: "row"
    }
});


export default FieldsPerfil

