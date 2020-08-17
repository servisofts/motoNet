

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    AppRegistry,
} from 'react-native';
import { connect } from 'react-redux';
/* import storage from '../../Storage';
 */
import Theme from '../../Styles/Theme.json'
import Svg from '../../Svg';

///import SkeletonContent from 'react-native-skeleton-content';

const Carga = (props) => {
    const [obj, setObj] = React.useState(false);


            

          if (!obj) {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const yourFunction = async () => {
                await delay(3000);
                setObj(true);
                props.state.navigationReducer.replace("LoginPage");
                return <View></View>  
            };
            yourFunction();
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
AppRegistry.registerComponent('Carga', () => Carga);
