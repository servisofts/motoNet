import React from 'react';

import { View } from 'react-native';
import ModeloInicio from './ModeloInicio';

// import { Container } from './styles';

const ModeloComponent = (props) => {

    if (!props.componente) {
        return <View></View>
    }


    switch (props.componente) {

        case 'inicio':
            return (
             
                    <ModeloInicio />
            )

        case 'ayuda':

            return <View />

        case 'meAyuda':
            return <View />



        default:
            return (
                <Text>no dio</Text>
            )
    }




}

export default ModeloComponent;
