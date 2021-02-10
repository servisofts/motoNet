import React from 'react';
import {  View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
import { connect } from 'react-redux';

import * as popupCalendarioActions from '../../../Actions/popupCalendarioActions'
import CalendarioPiker from '../PopupCalendario/CalendarioPiker';
const PopupCalendario = (props) => {


    if (!props.state.popupCalendarioReducer.estado) {
        return <View />

    }

        const cerrarVentana = () => {
            props.cerrarPopupCalendario();
            return <View />
        }




    return (


        <TouchableOpacity onPress={cerrarVentana} 
            style={{
                position: "absolute", width: "100%",
                backgroundColor: "#00000055", height: "100%",
                flexDirection: "row", justifyContent: "center",
                borderWidth: 1,
            }}>
            <TouchableWithoutFeedback>
                <View style={{
                    borderRadius: 20,
                    overflow: "hidden", flex: 0.8,
                    height: "80%", backgroundColor: "#fff",
                    marginTop: 20
                }}>

                    <ScrollView>

                        <CalendarioPiker/>
                    </ScrollView>

                </View>

            </TouchableWithoutFeedback>

        </TouchableOpacity>


    );

}

const initActions = ({
    ...popupCalendarioActions
});
const initStates = (state) => {
    return { state }
};

export default connect(initStates,initActions)(PopupCalendario);
