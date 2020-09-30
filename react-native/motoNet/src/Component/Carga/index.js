import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const Carga = (props) => {
    const [obj, setObj] = React.useState(false);

    if (obj) {
        if (props.state.usuarioReducer.estado === "cargando") {
            return <View />
        }
        if (props.state.socketClienteReducer.sessiones["motonet"].isOpen) {

            if (props.state.usuarioReducer.usuarioLog) {
                if (!props.state.usuarioReducer.usuarioDatos) {
                    props.state.socketClienteReducer.sessiones["motonet"].send({
                        component: "usuario",
                        type: "getById",
                        key: props.state.usuarioReducer.usuarioLog.key,
                        cabecera: "registro_cliente",
                        estado: "cargando"
                    }, true);
                    return <View />
                } else {
                    props.state.usuarioReducer.estado = ""
                    props.state.navigationReducer.replace("ViajePage");
                    return <View />;
                }
            }
            props.state.usuarioReducer.estado = ""
            props.state.navigationReducer.replace("LoginPage");
            return <View />;
        }
        //setObj(false);
        return <View />
    } else {

        const delay = ms => new Promise(res => setTimeout(res, ms));
        const yourFunction = async () => {
            await delay(2000);
            console.log("Waited 5s");
            setObj(true);
            return <View />;
        };
        yourFunction();

        //VERIFICO EL USUARIO

    }
    return (
        <View style={{
            height: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ alignItems: 'center', fontWeight: 'bold', color: '#fff' }}>Estamos en etapa de desarrollo.</Text>
                <Text style={{ alignItems: 'center', fontWeight: 'bold', color: '#fff' }}>Esperamos su comprencion</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Carga);

