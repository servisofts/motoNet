import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import moment, { now } from 'moment';
import 'moment/locale/es';
import LineHorizontal from '../../../component/LineHorizontal';
import AppParams from '../../../Json';

const Calendario = (props) => {
    const [obj, setObj] = React.useState({});
    var doctor = props.doctor;
    var horarios = props.state.horarioAtencionReducer.data[doctor.key];


    if (!obj.fecha_actual) {
        obj.fecha_actual = moment();
        props.state.consultaReducer.doctores[doctor.key] = {};
        setObj({ ...obj });
        return <View />
    }
    var diaStr = obj.fecha_actual.format("dddd").toUpperCase();
    var fechaStr = obj.fecha_actual.format("DD/MM/yyyy").toUpperCase();
    var diaInt = parseInt(obj.fecha_actual.format("d"));
    const getBtnAtras = () => {
        if (!obj.fecha_actual.isAfter(moment())) {
            return <View style={{
                width: 50,
                height: 50,
            }} ></View>;
        }
        return (
            <TouchableOpacity onPress={() => {
                if (!obj.fecha_actual.isAfter(moment())) {
                    return <View />;
                }
                obj.fecha_actual.add(-1, "days");
                props.state.consultaReducer.doctores[doctor.key] = {}
                setObj({ ...obj });
                props.onChange({
                    fecha: false,
                    hora: false
                })

            }}>
                <View style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: "#fff",
                        fontSize: 50
                    }}>{"<"}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const getBtnAdelante = () => {
        return (<TouchableOpacity onPress={() => {
            props.state.consultaReducer.doctores[doctor.key] = {}
            obj.fecha_actual.add(1, "days");

            setObj({ ...obj });
            props.onChange({
                fecha: false,
                hora: false
            })
        }}>
            <View style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 50
                }}>{">"}</Text>
            </View>
        </TouchableOpacity>)
    }

    const ordenador = (listaKeys) => {
        listaKeys.sort(function (a, b) {
            var textA = a;
            var textB = b;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        return listaKeys;
    }
    const getListaDia = () => {
        if (!horarios[diaInt]) {
            return <Text style={{ color: "#fff" }}>El doctor no esta disponible este dia.</Text>
        }
        if (!props.state.consultaReducer.doctores[doctor.key]) {
            props.state.consultaReducer.doctores[doctor.key] = {};
        }
        if (!props.state.consultaReducer.doctores[doctor.key][obj.fecha_actual.format("DD/MM/YYYY")]) {
            if (props.state.consultaReducer.estado == "cargando") {
                return (
                    <ActivityIndicator size="large" color="#fff" />
                )
            }
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "consulta",
                type: "getByDoctorFecha",
                key_doctor: doctor.key,
                fecha: obj.fecha_actual.format("DD/MM/YYYY"),
                estado: "cargando"
            }, true);
            return <ActivityIndicator size="large" color="#fff" />
        }
        var citas = props.state.consultaReducer.doctores[doctor.key][obj.fecha_actual.format("DD/MM/YYYY")];
        return ordenador(Object.keys(horarios[diaInt])).map((key) => {
            var isSelect = false;
            if (props.statePadre.horaSelect == key && props.statePadre.diaSelect == obj.fecha_actual.format("DD/MM/YYYY")) {
                isSelect = true;
            }
            var fechaYHora = moment(obj.fecha_actual.format("DD/MM/YYYY") + " " + key, "DD/MM/YYYY HH:mm");
            if (!fechaYHora.isAfter(moment())) {
                return <View />
            }
            var reservado = false;
            citas.map((objCita, keyCita) => {
                var fechaCita = moment(objCita.fecha_consulta);
                var fecha1 = fechaYHora.format("DD/MM/YYYY HH:mm");
                var fecha2 = fechaCita.format("DD/MM/YYYY HH:mm");
                console.log(objCita.fecha_consulta);
                console.log(fecha1);
                console.log(fecha2);
                if (fecha1 == fecha2) {
                    if (objCita["movimientos"]["confirmar_cita"]) {
                        reservado = true;
                    }
                }
            })
            var color = (isSelect ? "#fff" : "transparent");
            var textDecoration = "none";
            var textColor = (isSelect ? "#434343" : "#f2f2f2");

            if (reservado) {
                // color = "#f00";
                textDecoration = "line-through";
                textColor = "#a6a6a6"
            }
            return (
                <TouchableOpacity onPress={() => {
                    if (reservado) {
                        return;
                    }
                    props.onChange({
                        fecha: obj.fecha_actual.format("DD/MM/YYYY"),
                        hora: key
                    })
                }}>
                    <View style={{
                        width: 100,
                        padding: 4,
                        margin: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: textColor,
                        backgroundColor: color
                    }}>
                        <Text style={{ color: textColor, textDecorationLine: textDecoration }}>{key}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }
    return (
        <View style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {/* <Text> {JSON.stringify(horarios)} </Text> */}
            <View style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {getBtnAtras()}
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: 16,
                        color: "#fff",
                    }}>  {fechaStr}</Text>
                    <Text style={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: 16,
                        color: "#fff",
                        fontWeight: "bold"
                    }}>  {diaStr}</Text>
                </View>

                {getBtnAdelante()}
            </View>
            <View style={{
                width: "90%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {getListaDia()}
            </View>

        </View>
    );
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Calendario);