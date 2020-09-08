
import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../Svg';
const Politica = (props) => {

    return (

        <View style={MainContainer.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: "flex-start", backgroundColor: "yellow" }}>
                    <Svg name="volver"
                        style={{
                            width: 25,
                            height: 25,
                            fill: "#000"
                        }} />
                </View>
                <View style={{ alignItems: "flex-start", backgroundColor: "red" }}>
                    <Text style={{ alignItems: "flex-start", fontWeight: 'bold', color: '#fff', fontSize: 25 }}>
                        Politica Privacidad
                </Text>
                </View>
                <View style={{ alignItems: "flex-end", backgroundColor: "blue" }}>
                    <Svg name="LogoMoto"
                        style={{
                            width: 50,
                            height: 50,
                            fill: "#fff",
                        }} />
                </View>
            </View>

            <View style={contenedorPolitica.contenedor}>
                <Text style={politicaPrivacidad.leyenda}>
                    La Presente Politica de Privacidad establece los terminos en que se usa y protege
                    la informaicion que es proporcionada por sus usuarios al momento de utilizar su sitio web.
                    esta compañia esta comprometida con la seguridad de los datos de sus usuarios.
                    cuando le pedimos llenar los campos de informacion personal con la cual ud pueda ser indentificado,
                    lo hacemos asegurando que solo se empleara de acuerdo con los terminos de este documento.
                    sin embargo esta politica de provacidad puede cambiar con el tiempo o ser actualizada por lo que
                    le recordamos y enfatizamos revisar continuamente.
                </Text>

            </View>
        </View>
    );

}

const MainContainer = StyleSheet.create({
    container: {
        backgroundColor: "green",
        flex: 1,
        width: "100%",
        flexDirection: 'column',
    }
});

const contenedorPolitica = StyleSheet.create({
    contenedor: {
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const politicaPrivacidad = StyleSheet.create({
    leyenda: {
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'red'
    }
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Politica);
