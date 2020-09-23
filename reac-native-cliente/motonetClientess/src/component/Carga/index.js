import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


const Carga = (props) => {
    const [obj, setObj] = React.useState(false);

    if (obj) {
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
        <View style={{
            height: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            
          
        <Text style={{fontSize:20}}>Cargando....</Text>
           
        </View>
    );
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Carga);
