import React from 'react';
import { View, TextInput, Text } from 'react-native';
import CajaCharacter from './CajaCharacter';
import CajaInteger from './CajaInteger';
import CajaDecimales from './CajaDecimales';
import CajaPass from './CajaPass';
import CajaCalendario from './CajaCalendario';

/* 
                <CajaCalendario info_tabla={props.info_tabla} style={props.style} titulo={props.titulo} hanlechage={hanlechage} obj={props.obj} />
 */
const ModeloInput = (props) => {




    const hanlechage = (text, id) => {
        props.hanle(text, id)

    };


    switch (props.info_tabla.data_type) {

        case 'character varying':
            return (
                <CajaCharacter
                    style={props.style}
                    tituloInput={props.tituloInput}
                    info_tabla={props.info_tabla}
                    hanleCharater={hanlechage}

                />
            )

        case 'integer':

            return <CajaInteger
                info_tabla={props.info_tabla}
                style={props.style}
                tituloInput={props.tituloInput}
                hanleInteger={hanlechage}
                />

        case 'date':
            return <CajaCalendario
                info_tabla={props.info_tabla}
                style={props.style}
                tituloInput={props.tituloInput}
                hanleDate={hanlechage} />

        case 'timestamp without time zone':
            return <CajaCalendario
                info_tabla={props.info_tabla}
                style={props.style}
                tituloInput={props.tituloInput}
                hanleDate={hanlechage}
                />
        case 'double precision':
            return <CajaDecimales
                info_tabla={props.info_tabla}
                style={props.style}
                tituloInput={props.tituloInput}
                hanleDecimales={hanlechage}
                 />
        case 'Password':
            return <CajaPass
                info_tabla={props.info_tabla}
                style={props.style}
                tituloInput={props.tituloInput}
                hanlePass={hanlechage}
            />
        default:
            return (
                <View style={{
                    flex: 1,
                    width: '90%',
                    height: 50,
                    marginTop: 15,
                    borderWidth: 2,
                }}>
                    {}
                </View>
            )
    }

}
export default (ModeloInput);
