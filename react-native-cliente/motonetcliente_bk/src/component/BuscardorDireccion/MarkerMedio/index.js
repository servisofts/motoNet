import React from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native';
import Svg from '../../../Svg';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MarkerMedio = (props) => {


    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: "absolute",
                bottom: "50%",
                borderRadius: 100,
                borderColor: '#fff',
                // paddingBottom: 60
            }}>
            <Svg name="Milocation"
                style={{
                    width: 30,
                    height: 30,
                    fill: "#000"
                }} />
            {/* {getMarkerOrigen()} */}
        </View>
    )
}


export default MarkerMedio;
