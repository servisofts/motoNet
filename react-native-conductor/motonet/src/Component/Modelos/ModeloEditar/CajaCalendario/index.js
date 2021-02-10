import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as popupCalendarioActions from '../../../../Actions/popupCalendarioActions'
const CajaCalendario = (props) => {

    const abrirPopup = () => {

        props.abrirPopupCalendario((fechaSelecionada) => {
            props.cerrarPopupCalendario();
            props.hanleDate(fechaSelecionada, props.info_tabla.column_name)

        })
    }

    return (

        <TouchableOpacity
            onPress={abrirPopup}
            style={{
                width: '100%',
                marginTop: 15,
                height: 50,
            }}>

            <Text
                style={props.tituloInput}>{props.info_tabla.column_name}</Text>
            <Text style={(props.style)
            }>
                {props.info_tabla.value}
            </Text>
        </TouchableOpacity>
    )

}

const initActions = ({
    ...popupCalendarioActions,
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates, initActions)(CajaCalendario);
