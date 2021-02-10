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
const ModeloEditar = (props) => {




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

                />
            )

        case 'integer':

            return <CajaInteger
                info_tabla={props.info_tabla}
                style={props.style}
                tituloInput={props.tituloInput}
                />

        case 'date':
            return <CajaCalendario
                info_tabla={props.info_tabla}
                style={props.style}
                tituloInput={props.tituloInput}
                 />

        case 'timestamp without time zone':
            return <CajaCalendario
                info_tabla={props.info_tabla}
                style={props.style}
                tituloInput={props.tituloInput}
                />
        case 'double precision':
            return <CajaDecimales
                info_tabla={props.info_tabla}
                style={props.style}
                tituloInput={props.tituloInput}
                 />
        case 'Password':
            return <CajaPass
                info_tabla={props.info_tabla}
                style={props.style}
                tituloInput={props.tituloInput}
            />
        default:
            return (
                <View style={{
                    flex: 1,
                    width: '100%',
                    marginTop: 15,
                    borderWidth: 2,
                }}>
                    <Text>
                        notiene
                    </Text>
                </View>
            )
    }

}
export default (ModeloEditar);
