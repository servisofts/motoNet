import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


const Carga = (props) => {
    const [obj, setObj] = React.useState(false);

    if (obj) {
        if (props.state.usuarioReducer.usuarioLog) {
            //si tengo un usuario
            if (!props.state.viajesReducer.viaje) {
                props.state.navigationReducer.replace("InicioPage");
            }
            props.state.navigationReducer.replace("ViajeEsperaPage");
            //falta comprovar si tengo viaje 
            // si no tengo viaje voy a incio
            //si tengo viaje voy a la etapa que corresponda del viaje.
        }
        props.state.usuarioReducer.estado = ""
        props.state.navigationReducer.replace("LoginPage");
        //setObj(false);
        return <View />
    } else {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const yourFunction = async () => {
            await delay(3000);
            console.log("Waited 5s");
            setObj(true);
            return <View />;
        };
        yourFunction();
    }

    return (

        <View >

     

        </View>
    );
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Carga);
