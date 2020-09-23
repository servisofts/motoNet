import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Svg from '../../../Svg';
import ListaBusqueda from '../ListaBusqueda';
const BuscadorComponenteMap = (props) => {

    const [data, setData] = React.useState({
        obj: {
            texto: "",
            escribiendo: "",
        },
        mostrarTexto: false,
        ubicacionActual: props.ubicacionActual || false,
        repuestaInput: false,
        focusInput: false
    })
    if (props.state.locationGoogleMapReducer.estado === "exito") {
        data.repuestaInput = props.state.locationGoogleMapReducer.data
        data.focusInput = true
        props.state.locationGoogleMapReducer.estado = ""
        setData({ ...data });
    }
    const hanlechage = (text, id) => {
        data.obj.texto = text
        Geolocation.getCurrentPosition((info) => {
            data.ubicacionActual = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            }
            setData({ ...data })
        });
        if (!data.ubicacionActual) {
            return <View />
        }
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "locationGoogle",
            type: "autoComplete",
            data: {
                direccion: text,
                ...data.ubicacionActual
            },
            estado: "cargando"
        }, true);


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

            <View style={{
                width: "100%",
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Svg name="MarkerMoto"
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#000"

                    }} />
                <View
                    style={styles.buscar}>
                    <TextInput
                        style={{
                            flex: 1,
                            width: "100%",
                            paddingLeft: 10,
                            fontSize: 12
                        }}
                        placeholder={"Calle"}
                        value={() => {
                            if (!data.mostrarTexto) {
                                return data.obj.texto
                            }
                            return data.obj.escribiendo
                        }}
                        onChangeText={(texto) => {
                            if (!data.mostrarTexto) {
                                hanlechage(texto, "textInput")
                            }
                            hanlechage(texto, "escribiendo")
                        }}
                        onFocus={() => {
                            data.mostrarTexto = true
                            setData({ ...data });
                            return data.focusInput
                        }}
                    />
                </View>
            </View>
            <ListaBusqueda />

        </View>
    )

}
const styles = StyleSheet.create({
    buscar: {
        width: 250,
        height: 50,
        borderColor: "#00000022",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center',

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
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(BuscadorComponenteMap);

