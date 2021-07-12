import React from 'react'
import { View, Text, TextInput,StyleSheet, TouchableOpacity } from 'react-native'
import Svg from '../../Svg'
import LineHorizontal from '../LineHorizontal'
import { SPopupOpen } from '../../SPopup';
const FieldsPerfil = ({ datos }) => {

    if (!datos) {
        console.log(datos)
        return <Text>No hay datos</Text>
    } else {
        console.log(datos)
    }

    const editarCampo = (key) => {
        SPopupOpen({
            key: "editarCampo",
            content: <View  style={{
                width: "100%",
                //marginTop: 30,
                //alignItems: 'justify',
                padding:10
            }}>
                <Text style={{paddingBottom:10}}>{key}:</Text>
                    <TextInput
                            //style={!obj.usr.error ? styles.touch2 : styles.touch2Error }
                            style={styles.touch2}
                            placeholder={"Ingresar correo"}
                            //onChangeText={text => hanlechage(text, "usr")}
                            defaultValue={datos[key].dato}
                            autoCapitalize='none'
                            autoFocus={true}
                            multiline={false}
                            placeholderTextColor={'#626262'}
                           //keyboardType={'email-address'}
                            autoCorrect={false}
                            underlineColorAndroid={'transparent'}
                            
                        />
                    <TouchableOpacity
                                onPress={() => {
                                    
                                }}
                                style={styles.touch4}>
                                <Text
                                    style={{
                                        color: '#fff',
                                    }} >
                                    Guardar
                        </Text>
                            </TouchableOpacity>    
            </View>
        })
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
                <TouchableOpacity style={styles.edit_content} onPress={() => {
                    editarCampo("Nombres");
                }}>
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
                <TouchableOpacity style={styles.edit_content} onPress={() => {
                    editarCampo("Apellidos");
                }}>
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
                <TouchableOpacity style={styles.edit_content} onPress={() => {
                    editarCampo("Correo");
                }}>
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
                <TouchableOpacity style={styles.edit_content} onPress={() => {
                    editarCampo("Telefono");
                }}>
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
    },
    touch2: {
        backgroundColor: "#F7F7F7",
        width: "100%",
        height: 50,
        paddingLeft: 15,
        borderRadius: 5,
        shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: -2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 2,
        color:"#707070"
    },
    touch2Error: {
        backgroundColor: "#F7F7F7",
        width: "100%",
        height: 50,
        paddingLeft: 15,
        borderRadius: 10,
        shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: -2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 2,
        borderColor: "red",
        borderWidth: 1,
        color:"#707070"
    },
    touch4: {
        backgroundColor: "#F7001D",
        width: "100%",
        height: 40,
        margin: 2,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: -2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 2,
    }
});



export default FieldsPerfil

