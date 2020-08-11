

import React from 'react';
import { View, Text, } from 'react-native';
import { connect } from 'react-redux';
/* import storage from '../../Storage';
 */
import Theme from '../../Styles/Theme.json'
import Svg from '../../Svg';


const Carga = (props) => {
    const [obj, setObj] = React.useState(false);

    if (obj) {

        props.state.navigationReducer.navigate("LoginPage");


    } else {

        const delay = ms => new Promise(res => setTimeout(res, ms));
        const yourFunction = async () => {
            await delay(3000);
            console.log("Waited 5s");
            setObj(true);

        };
        yourFunction();
    }
  
  
    return (

        <View style={{
            height: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Theme.colors.fondo
        }}>





            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                <Svg name="LogoGlup"
                    style={{
                        width: 200,
                        height: 200,
                        fill: "#fff"

                    }} />

                <Text style={{ alignItems: 'center', fontWeight: 'bold', color: '#fff' }}>Estamos en etapa de desarrollo.</Text>
                <Text style={{ alignItems: 'center', fontWeight: 'bold', color: '#fff' }}>Esperamos su comprencion</Text>
            </View>

        </View>

    );

}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Carga);