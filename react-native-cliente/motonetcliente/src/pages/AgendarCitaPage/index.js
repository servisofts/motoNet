import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TouchableOpacity, View, StyleSheet, Image, RefreshControl, ActivityIndicator } from 'react-native'
import ImgFondoCruces from '../../component/ImgFondoCruces'
import LineHorizontal from '../../component/LineHorizontal';
import Svg from '../../Svg';
import { ScrollView } from 'react-native-gesture-handler';
import urlFoto from '../../Json/index.json';
import Calendario from './Calendario';
// import moment from
class AgendarCitaPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            horaSelect: "",
            diaSelect: "",
            isFetching: false,
        };
    }


    onRefresh() {
        console.log(this.state.isFetching)
        // alert("fdfd")
        this.state.isFetching = true;
        console.log(this.state.isFetching)
        this.getAllHorario();
        // return <View />
    }

    getAllHorario = () => {
        var doctor = this.props.navigation.state.params.Doctor;
        console.log("Obtengo datos de servidor Farmacia")
        this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
            component: "horarioAtencion",
            type: "getAll",
            key_doctor: doctor.key,
            estado: "cargando"
        }, true);
        this.state.isFetching = false;
    }

    gegPerfilDoctor = (obj) => {

        if (!this.props.state.usuarioReducer.data[obj.key]) {
            if (this.props.state.usuarioReducer.estado == "cargando") {
                return (
                    <ActivityIndicator size="large" color="#fff" />
                )
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
        // console.log(usuario)
        if (usuario["Foto perfil"]) {
            url = urlFoto.urlImages + usuario["Foto perfil"].dato + `?type=getPerfil&key_usuario=${usuario["Foto perfil"].key_usuario}`;
        }

        return <>
            <View style={{
                flex: 1,
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
            </View>
        </>
    }


    render() {

        var doctor = this.props.navigation.state.params.Doctor;
        var key_especialidad = this.props.navigation.state.params.key_especialidad
        var especialidad = this.props.state.especialidadReducer.data[key_especialidad];
        if (!this.props.state.horarioAtencionReducer.data[doctor.key]) {
            if (this.props.state.horarioAtencionReducer.estado == "cargando") {
                return <View />
            }
            this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                component: "horarioAtencion",
                type: "getAll",
                key_doctor: doctor.key,
                estado: "cargando"
            }, true);
            return <View />
        }

        return (
            <View style={{
                flex: 1,
            }}>
                <ImgFondoCruces />

                <ScrollView refreshControl={
                    < RefreshControl
                        refreshing={this.state.isFetching}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }
                >
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        marginTop: 20,
                        alignItems: "center",
                        marginBottom: 20
                        // maxHeight:500
                    }}>
                        <View style={{
                            width: "85%",
                            backgroundColor: "#2C4C7E",
                            paddingTop: 20,
                            paddingBottom: 20,
                            borderRadius: 20,
                            justifyContent: "center",
                        }}>


                            <View style={{
                                // flexDirection: "row",
                                marginTop: 10,
                                alignItems: "center",
                                marginBottom: 10,
                                justifyContent: "center",

                            }}>

                                {this.gegPerfilDoctor(doctor)}

                            </View>
                            <Text style={{
                                color: "#fff",
                                fontSize: 20,
                                fontWeight: "bold",
                                textAlign: "center",
                            }}>
                                Dr. {doctor.data["Nombres"].dato} {doctor.data["Apellidos"].dato}
                            </Text>

                            <Text style={{
                                color: "#fff",
                                fontSize: 20,
                                fontWeight: "normal",
                                // fontStyle: "italic",
                                textAlign: "center",
                                marginTop: 10,
                                marginBottom: 10
                                // /backgroundColor:"#ccc"
                            }}>
                                {especialidad.nombre}
                            </Text>

                            <LineHorizontal />

                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 10,
                            }}>
                                <Calendario doctor={doctor} statePadre={this.state} onChange={(resp) => {
                                    this.state.horaSelect = resp.hora
                                    this.state.diaSelect = resp.fecha
                                    this.state.noDia = false;
                                    this.setState({ ...this.state })
                                }} />
                                {/* {this.gethorario()} */}
                            </View>


                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                marginTop: 20,
                                // marginBottom: 20
                            }}>
                                {this.state.noDia ? (<Text style={{
                                    color: "#922",
                                    fontWeight: "bold",
                                    padding: 8,

                                }}>Debe seleccionar una hora</Text>) : <View />}

                                <TouchableOpacity onPress={() => {
                                    if (!this.state.horaSelect || !this.state.diaSelect) {

                                        this.state.noDia = true;
                                        this.setState({ ...this.state });
                                        return <View />
                                    }

                                    this.props.navigation.push("ReservarCitaPage", { Doctor: doctor, Hora: this.state.horaSelect, Dia: this.state.diaSelect, especialidad: especialidad });
                                }}
                                    style={{
                                        backgroundColor: "#fff",
                                        width: 200,
                                        height: 40,
                                        borderRadius: 100,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                    <Text style={{
                                        textAlign: "center"
                                    }}>
                                        AGENDAR CITA
                            </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    line: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(AgendarCitaPage);