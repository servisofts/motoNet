
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../Svg';
const Listas = (props) => {

    return (

        <View style={MainContainer.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: "center", backgroundColor: "red" }}>
                    <Svg name="volver"
                        style={{
                            width: 60,
                            height: 45,                            
                            fill: "#fff"
                        }} />
                </View>
                <View style={{ backgroundColor: "red", width: "100%", alignItems: "center", justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 25 }}>
                        Viajes
                </Text>
                </View>

            </View>

            <View style={contenedorPolitica.contenedor}>
                <ScrollView style={{ width: "100%", backgroundColor: "red" }}>
                    {
                        [
                            { nombre: 2 },
                            { nombre: 3 },
                            { nombre: 4 },
                            { nombre: 5 },
                            { nombre: 6 },
                        ].map((obj, key) => {
                            return (
                                <Text style={politicaPrivacidad.leyenda}>
                                    {obj.nombre}
                                    <Image style={imagenLista.imgLista} source={require('../../img/maps.jpg')} />

                                </Text>
                            )

                        })
                    }

                </ScrollView>

            </View>
        </View>
    );

}

const MainContainer = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        flexDirection: 'column',
    }
});

const contenedorPolitica = StyleSheet.create({
    contenedor: {
        width: "100%",
        marginBottom: 35,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const politicaPrivacidad = StyleSheet.create({
    leyenda: {
        marginTop: 5,
        padding: 20,
        backgroundColor: "white",
        fontSize: 24,
        alignItems: 'center',
        justifyContent: "center",
        fontWeight: 'bold',
        color: 'red'
    }
});

const imagenLista = StyleSheet.create({
    imgLista: {
        width: 100,
        height: 40
    }
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Listas);
