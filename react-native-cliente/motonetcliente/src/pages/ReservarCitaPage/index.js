import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TouchableOpacity, View, StyleSheet, Image, Dimensions, ScrollView, Alert, ActivityIndicator } from 'react-native'
import ImgFondoCruces from '../../component/ImgFondoCruces'
import { NavigationActions } from 'react-navigation';
import LineHorizontal from '../../component/LineHorizontal';
import Svg from '../../Svg';
import ToolTitle from '../../component/ToolTitle';
import urlFoto from '../../Json/index.json';

import moment from 'moment';
class ReservarCitaPage extends Component {

    gegPerfilDoctor = (obj) => {

        if (!this.props.state.usuarioReducer.data[obj.key]) {
            if (this.props.state.usuarioReducer.estado == "cargando") {
                return <Text>Cargando</Text>
            }
            this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                component: "usuario",
                type: "getById",
                key: obj.key,
                cabecera: "registro_doctor",
                estado: "cargando"
            }, true);
            return <View />
        }
        var usuario = this.props.state.usuarioReducer.data[obj.key];
        var url = "";
        console.log(usuario)
        if (usuario["Foto perfil"]) {
            url = urlFoto.urlImages + usuario["Foto perfil"].dato + `?type=getPerfil&key_usuario=${usuario["Foto perfil"].key_usuario}`;
        }

        return <>
            <View style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {
                    !url ? (
                        <View style={{
                            width: 80,
                            height: 80,
                            borderRadius: 100,
                            borderWidth: 2,
                            borderColor: "#fff",
                        }} >
                        </View>
                    ) : (

                            <View style={{
                            }} >
                                <Image source={{ uri: url }}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 100,
                                        borderWidth: 2,
                                        borderColor: "#fff",
                                    }} />
                            </View>
                        )
                }
                <Text style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                }}>
                    Dr. {obj.data["Nombres"].dato} {obj.data["Apellidos"].dato}
                </Text>
            </View>
        </>
    }

    render() {

        // const [datos, setDatos] = React.useState({});

        var doctor = this.props.navigation.state.params.Doctor;
        var hora = this.props.navigation.state.params.Hora;
        var dia = this.props.navigation.state.params.Dia;
        var especialidad = this.props.navigation.state.params.especialidad;
        if (!this.props.state.tipoConsultaReducer.data) {
            // if (!props.state.socketReducer.socket) {
            //     return (
            //         //<CircularProgress color="#fff" style={{ display: "block" }} />
            //         <View />
            //     )
            // }
            if (this.props.state.tipoConsultaReducer.estado == "cargando") {
                return (
                    <ActivityIndicator size="large" color="#2C4C7E" />
                )
                // return <View />
            }

            this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                component: "tipoConsulta",
                type: "getAll",
                estado: "cargando",
            }, true);

            return (
                // <CircularProgress color="#fff" style={{ display: "block" }} />
                <View />
            )
        }

        if (!this.props.state.tipoConsultaDoctorReducer.data[doctor.key]) {
            // if (!props.state.socketReducer.socket) {
            //     return (
            //         // <CircularProgress color="#fff" style={{ display: "block" }} />
            //         <View />
            //     )
            // }
            if (this.props.state.tipoConsultaDoctorReducer.estado == "cargando") {
                // return <CircularProgress color="#fff" style={{ display: "block" }} />
                return <View />
            }
            this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                component: "tipoConsultaDoctor",
                type: "getAll",
                estado: "cargando",
                key_doctor: doctor.key
            }, true);

            return (
                // <CircularProgress color="#fff" style={{ display: "block" }} />
                <View />
            )
        }

        var tipoConsulta = this.props.state.tipoConsultaReducer.data;
        var tipoConsultaActivos = this.props.state.tipoConsultaDoctorReducer.data[doctor.key]

        //console.log(tipoConsultaActivos)
        if (this.props.state.consultaReducer.estado == "exito" && this.props.state.consultaReducer.type == "registro") {
            this.props.navigation.replace("ListaConsultaPage");
        }

        var getLista = () => {
            if (Object.keys(tipoConsultaActivos).length <= 0) {
                return <Text style={{ color: "#f44" }}>Lo sentimos este doctor no tiene activado ninguna modalidad de consultas.</Text>
            }
            return Object.keys(tipoConsulta).map((key) => {
                var obj = tipoConsulta[key];
                return (
                    <View style={{
                        // margin: 20,
                    }}>
                        {tipoConsultaActivos[key] ? (
                            <TouchableOpacity style={{
                                backgroundColor: "#2C4C7E",
                                borderRadius: 100,
                                width: Dimensions.get("window").width * 0.25,
                                height: Dimensions.get("window").width * 0.25,
                                justifyContent: 'center',
                                alignItems: "center",
                                borderWidth: 2,
                                borderColor: "#999",
                                elevation: 2
                            }}
                                onPress={() => {
                                    Alert.alert(
                                        'CONFIRMAR CONSULTA',
                                        '¿Estás seguro de que deseas solicitar la cita?',
                                        [
                                            { text: 'Cancelar', onPress: () => console.log("cancelar"), style: 'cancel' },
                                            {
                                                text: 'Aceptar', onPress: () => {
                                                    this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                                                        component: "consulta",
                                                        type: "registro",
                                                        estado: "cargando",
                                                        key_doctor: doctor.key,
                                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                                        key_tipo_consulta: obj.key,
                                                        key_especialidad: especialidad.key,
                                                        fecha: moment(dia, "DD/MM/YYYY").format("YYYY-MM-DD"),
                                                        dia: moment(dia, "DD/MM/YYYY").format("d"),
                                                        hora: hora
                                                    }, true);

                                                    // const resetAction = NavigationActions.navigate({
                                                    //     routeName: 'ServicioPage',
                                                    //     params: {},
                                                    //     actions: [
                                                    //         NavigationActions.navigate({ routeName: "ListaConsultaPage" })
                                                    //     ],
                                                    // });
                                                    // this.props.navigation.setParams({ "backTo": "ServicioPage" });
                                                    // this.props.navigation.dispatch({
                                                    //     routeName: "ConsultaPage",
                                                    //     type: "GoToRoute"
                                                    // });
                                                }
                                            },
                                        ],
                                        { cancelable: false }
                                    )
                                }}>
                                <Text style={{ color: "#fff", textAlign: "center" }}>
                                    {obj.nombre}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                                <View />
                            )
                        }
                    </View>
                )
            })
        }

        return (
            <>
                <ImgFondoCruces />
                <ToolTitle name="CONFIRMAR CONSULTA" />

                <ScrollView style={{
                    height: "100%",
                }}
                    contentContainerStyle={{
                        alignItems: "center",
                    }}
                >
                    <View style={{
                        backgroundColor: "#2C4C7E",
                        height: 200,
                        marginTop: 8,
                        width: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,

                    }}>
                        {this.gegPerfilDoctor(doctor)}
                        <View style={{ justifyContent: "center", padding: 8, }}>
                            <Text style={{
                                color: "#999",
                                fontSize: 12,
                                textAlign: "center"
                            }}>
                                Especialidad:
                         </Text>
                            <Text style={{
                                color: "#fff",
                                fontSize: 20,
                            }}>
                                {especialidad.nombre}
                            </Text>
                        </View>

                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",
                        marginTop: 16,
                        paddingBottom: 40,
                    }}>
                        <Text style={{
                            color: "#999",
                            fontWeight: "bold",
                            fontSize: Dimensions.get("window").width * 0.04,
                        }}>
                            Fecha y hora de tu cita:
                    </Text>

                        <Text style={{
                            color: "#666",
                            fontWeight: "bold",
                            fontSize: Dimensions.get("window").width * 0.07,
                        }}>
                            {dia}
                        </Text>

                        <Text style={{
                            color: "#666",
                            fontWeight: "bold",
                            fontSize: Dimensions.get("window").width * 0.07,
                        }}>
                            {moment(dia, "DD/MM/YYYY").format("dddd").toUpperCase()} - {hora}
                        </Text>
                        <View style={{}}>
                            <Text style={{
                                color: "#666",
                                fontSize: 14,
                                marginTop: 20,
                                textAlign: "center"
                            }}>
                                Para confirmar su cita, {"\n"}seleccione la modalidad de su preferencia:
                            </Text>
                            <View style={{
                                alignItems: "center",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "space-evenly",
                                marginTop: 10
                            }}>
                                {getLista()}
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {this.props.state.consultaReducer.estado == "cargando" && this.props.state.consultaReducer.type == "registro" ? (
                    < View style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#00000050",
                        justifyContent: "center",
                        alignItems: "center",
                        position: 'absolute',
                    }}>
                        <ActivityIndicator color="#2C4C7E" size="large" />
                    </View>
                ) : (
                        <View />
                    )
                }
                {/* < ModalPage
                    ventana="ModalError"
                    ModalVisible={this.state.modalVisible}
                    closeModal={() => {
                        this.props.state.usuarioReducer.estado = false
                        this.state.modalVisible = false;
                        this.setState({ ...this.state })
                    }}
                /> */}
            </>
        )

    }
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ReservarCitaPage);