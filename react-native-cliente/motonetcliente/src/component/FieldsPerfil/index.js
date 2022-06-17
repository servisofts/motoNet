import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Svg from '../../Svg'
import LineHorizontal from '../LineHorizontal'
import { SPopupClose, SPopupOpen } from '../../SPopup';
import AppParams from "../../Json"

const FieldsPerfil = ({ datos, propPat }) => {

    var cabecera = "registro_cliente";
    const [obj, setObj] = React.useState({
        usr: {
            value: "",
            error: false
        },
    });



    const hanlechage = (text, id) => {
        if (id === "usr") {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(text) === false) {
                obj[id] = {
                    value: text,
                    error: true,
                }
            }
            else {
                obj[id] = {
                    value: text,
                    error: false,
                }
            }
            setObj({ ...obj })
            return <View />
        }
        obj[id] = {
            value: text,
            error: false,
        }
        setObj({ ...obj })
        return <View />
    };



    if (!datos) {

        Text
        // console.log(datos)
        return <Text>No hay datos</Text>
    } else {
        // console.log(datos)

        // datos["Telefono"].dato !=0 ? datos["Telefono"].dato = "777" : datos["Telefono"].dato = "111";
        
        // if (!datos["Telefono"].dato || datos["Telefono"].dato.length <= 5) {
        //     alert("poco numeros")
        // }
 
    }

    if (!propPat.state.cabeceraDatoReducer.data[cabecera]) {
        if (propPat.state.cabeceraDatoReducer.estado == "cargando") {
            return <View />
        }
        propPat.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "cabeceraDato",
            type: "getDatoCabecera",
            estado: "cargando",
            cabecera: cabecera
        });
        return <View />
    }

    const getKeyDato = (keyDescripcion) => {
        var cabecera = "registro_cliente";
        var props = propPat;
        var key = "undefined"

        //alert((propPat.state.cabeceraDatoReducer.data[cabecera]))

        for (let i = 0; i < props.state.cabeceraDatoReducer.data[cabecera].length; i++) {
            const obj2 = props.state.cabeceraDatoReducer.data[cabecera][i];
            if (obj2.dato.descripcion == keyDescripcion) {
                return obj2;
            }
        }
        return {
            key
        }
    };




    const editarCampo = (key) => {


        hanlechage("", "usr")
        SPopupOpen({
            key: "editarCampo",

            content: <View style={{
                width: "100%",
                //marginTop: 30,
                //alignItems: 'justify',
                padding: 10
            }}>
                <Text style={{ paddingBottom: 10 }}>{key}:</Text>
                <TextInput
                    style={!obj.usr.error ? styles.touch2 : styles.touch2Error}
                    placeholder={"Ingresar dato"}
                    onChangeText={text => hanlechage(text, "usr")}
                    defaultValue={datos[key].dato ? datos[key].dato : obj.usr.value}
                    autoCapitalize='none'
                    autoFocus={true}
                    multiline={false}
                    placeholderTextColor={'#626262'}
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}

                />
                <TouchableOpacity
                    onPress={() => {
                        var datas = {}
                        var exito = true;
                        for (const key in obj) {
                            if (!obj[key].value || obj[key].value.length <= 0) {
                                obj[key].error = true;
                                exito = false;
                            } else {
                                obj[key].error = false;
                                datas[key] = obj[key].value
                            }
                        }
                        setObj({ ...obj })
                        if (exito) {
                            var datosToSend = [];
                            var datosKeys = [];
                            datosKeys.push(key);
                            datosToSend.push({
                                dato: getKeyDato(key),
                                data: obj.usr.value
                            })
                            propPat.state.socketClienteReducer.sessiones["motonet"].send({
                                component: "usuario",
                                type: "insertarDato",
                                data: datosToSend,
                                estado: "cargando",
                                key_usuario: datos["Apellidos"].key_usuario,
                                key_datos: datosKeys
                            }, true);
                            SPopupClose("editarCampo");
                            // alert(JSON.stringify(datosKeys))
                        }
                    }}
                    style={styles.touch4}>
                    <Text
                        style={{
                            color: '#fff',
                        }} >
                        Guardar
                    </Text>
                </TouchableOpacity>
            </View >
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
                    {/* <Text style={styles.TextCampo}>
                        {!datos["Nombres"].dato ? "" : datos["Nombres"].dato}
                    </Text> */}

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
        color: "#707070"
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
        color: "#707070"
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

