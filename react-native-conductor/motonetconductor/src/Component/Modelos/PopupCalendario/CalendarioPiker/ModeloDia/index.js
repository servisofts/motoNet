import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Moment from 'moment'
import { connect } from 'react-redux';


const ModeloDia = (props) => {


    var fechaFin = Moment(props.moment, "YYYYMMDD");
    var dia = fechaFin.format("DD");

    var mes = Moment().format('MM');
    var ano = Moment().format('YYYY');

    const handleClick = () => {

        var fechaDia = fechaFin.format("DD/MM/YYYY");


        props.state.popupCalendarioReducer.onChange(fechaDia);

    }

    if (props.momentActucal.format("MM") === fechaFin.format("MM")) {


        if (props.momentActucal.format("DD") === fechaFin.format("DD") && props.momentActucal.format("MM") === mes && props.momentActucal.format("YYYY") === ano) {
            return (

                <TouchableOpacity onPress={handleClick} style={{
                    flexDirection: 'column',
                    borderColor: '#fff',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    width: 70,
                    height: 60,
                    flex: 1,
                    fontSize: 15,
                }}>
                    <View style={{ flex: 1, }}>
                        <View style={{ alignItems: 'center', borderWidth: 1, }}>
                            <Text style={{ fontSize: 13, color: '#ffffff', position: "absolute", top: 0, borderRadius: 100, borderWidth: 1, }}>{dia}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

        return (

            <TouchableOpacity onPress={handleClick} style={{
                flexDirection: 'column',
                borderColor: '#fff',
                borderBottomWidth: 1,
                alignItems: 'center',
                width: 70,
                height: 60,
                flex: 1,
                fontSize: 15,
            }}>
                <View style={{ flex: 1, }}>
                    <View style={{ alignItems: 'center', }}>
                        <Text style={{ fontSize: 13, color: '#ffffff', position: "absolute", top: 0 }}>{dia}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )



    } else {
        if (props.momentActucal.format("DD") === fechaFin.format("DD") && props.momentActucal.format("MM") === mes && props.momentActucal.format("YYYY") === ano) {

            return (

                <TouchableOpacity onPress={handleClick}
                    style={{
                        borderColor: '#fff',
                        borderBottomWidth: 1,
                        width: 70,
                        alignItems: 'center',
                        height: 60,
                        flex: 1,
                        fontSize: 15,
                        backgroundColor: "#ffffff22"
                    }}>

                    <View style={{ alignItems: 'center', }}>

                        <Text style={{ textAlign: 'center', fontSize: 13, color: '#ffffff', position: "absolute", top: 0, borderRadius: 100, borderWidth: 1, }}>{dia}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity onPress={handleClick}
                style={{
                    borderColor: '#fff',
                    borderBottomWidth: 1,
                    width: 70,
                    alignItems: 'center',
                    height: 60,
                    flex: 1,
                    fontSize: 15,
                    backgroundColor: "#ffffff22"
                }}>
                <View style={{ alignItems: 'center', }}>

                    <Text style={{ textAlign: 'center', fontSize: 13, color: '#ffffff', position: "absolute", top: 0 }}>{dia}</Text>
                </View>
            </TouchableOpacity>

        )
    }

}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ModeloDia);
