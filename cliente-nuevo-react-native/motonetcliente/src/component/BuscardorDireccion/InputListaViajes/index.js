import React from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';
import * as locationActions from '../../../action/locationActions'

const BuscadorComponenteMap = (props) => {

    const [texto, settexto] = React.useState({
        textInput: "",
        estado: false
    })
   /*  const peticion = () => {
        Geolocation.getCurrentPosition((info) => {
            data.ubicacionActual = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            }
            props.state.socketClienteReducer.sessiones["glup"].send({
                component: "locationGoogle",
                type: "autoComplete",
                data: {
                    direccion: data.obj.escribiendo,
                    ...data.ubicacionActual
                },
                estado: "cargando"
            }, true);
        });
    } */
    const hanlechage = (text) => {
        if (text.length > 5) {
            texto.textInput = text
            setData({ ...data })
/*             peticion()
 */            return <View />
        }
        texto.textInput = text
        setData({ ...data })
        return <View />
    };


    return (
        <View style={{
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            position: "absolute",
            top: 20,
            flexDirection: 'column',
        }}>
            <View
                style={styles.buscar}>

                <View style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "#f00",
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                }}>
                    <Text style={{ color: "#fff" }}>
                        Viaje
                        </Text>
                </View>
                <View style={{
                    width: "80%",
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}>

                    <TextInput
                        style={{
                            flex: 0.9,
                            width: "90%",
                            fontSize: 10,
                            alignItems: 'center',

                        }}
                        onFocus={() => {
                            data.obj.inicio.estado = false
                            data.obj.fin.estado = true
                            setData({ ...data })
                        }}
                        placeholder={"Calle"}
                        value={texto.textInput}
                        onChangeText={(texto) => hanlechage(texto)}

                    />
                    <TouchableOpacity
                        onPress={() => {
                            data.obj.inicio.estado = false
                            data.obj.fin.estado = true
                            data.obj.fin.value = ""
                            data.obj.texto = ""
                            setData({ ...data })

                        }}
                    >
                        <Svg name="eliminar"
                            style={{
                                width: 25,
                                height: 25,
                                fill: "#000000"

                            }} />
                    </TouchableOpacity>
                </View>


            </View>

        </View>
    )

}
const styles = StyleSheet.create({
    buscar: {
        width: 300,
        height: 50,
        borderColor: "#00000022",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    touchableOpacity: {
        width: 150,
        height: 50,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        borderRadius: 10,
        bottom: 10
    },
    touchableOpacity2: {
        width: 150,
        height: 50,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        borderRadius: 10,
        bottom: 10
    },

});
const initActions = ({
    ...locationActions,
});
const initStates = (state) => {
    return { state }
};

export default connect(initStates, initActions)(BuscadorComponenteMap);

