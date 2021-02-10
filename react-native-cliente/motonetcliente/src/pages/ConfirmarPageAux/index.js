import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import ButtonComponent from '../../component/ButtonComponent';
import ImgComponent from '../../component/ImgComponent';
import Geolocation from '@react-native-community/geolocation';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import { NavigationActions, StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
// import PopupUbicacion from './PopupUbicacion';

const delay = ms => new Promise(res => setTimeout(res, ms));

class ConfirmarPageAux extends Component {

    static navigationOptions = ({ navigation }) => (
        navigation.state.prop ? ({ ...navigation.state.prop }) : {}
    );

    constructor(props) {
        super();
        this.state = {
            completado: false,
            tiempo: false,
            estado: false,
            TiempoEspera: 5,
            region: false,
            startValue: new Animated.Value(1.2),
        };
    }

    // getPosition = () => {
    //     Geolocation.setRNConfiguration({ authorizationLevel: 'whenInUse', skipPermissionRequests: false, })
    //     Geolocation.getCurrentPosition(
    //         (position) => {
    //             // if (!this.state.region) {
    //             //     return <View />
    //             // }
    //             // if (data.region.isRender) {
    //             //     return <View />
    //             // }
    //             var region = {
    //                 ...position.coords,
    //                 timestamp: position.timestamp
    //             }
    //             this.props.dispatch({
    //                 component: "locationEmergencia",
    //                 type: "Miubicacion",
    //                 data: region,
    //             });
    //             // this.state.region = {
    //             //     longitude: position.coords.longitude,
    //             //     latitude: position.coords.latitude,
    //             // }
    //             // this.setState({ ...this.state })
    //             // this.watchPosition();
    //         },
    //         (error) => {
    //             console.log(error);
    //             console.log(error.code, error.message);

    //         },
    //         { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    //     );
    // }
    componentDidMount() {
        this.empezarConteo()   // this.getPosition();
    }

    contarTiempo = async () => {
        this.state.estado = "cargando";
        await delay(1000);
        this.state.tiempo -= 1;
        this.state.estado = false;
        this.setState({ ...this.state });
        return <View />;
    };

    empezarConteo() {
        this.state.tiempo = this.state.TiempoEspera + 1;
        this.state.startValue = new Animated.Value(1);
        this.setState({ ...this.state });
        Animated.loop(
            Animated.spring(this.state.startValue, {
                toValue: 1.2,
                friction: 1,
                useNativeDriver: true,
            }),
            { iterations: 1000 },
        ).start();
    }


    getButton() {

        if (!this.state.tiempo || this.state.tiempo <= 0) {
            Animated.timing(
                this.state.startValue
            ).stop();
            return (
                <ButtonComponent name={"BtnSos"}
                    onPress={
                        // this.state.tiempo = this.state.TiempoEspera + 1;
                        // this.state.startValue = new Animated.Value(1);
                        // this.setState({ ...this.state });
                        // Animated.loop(
                        //     Animated.spring(this.state.startValue, {
                        //         toValue: 1.2,
                        //         friction: 1,
                        //         useNativeDriver: true,
                        //     }),
                        //     { iterations: 1000 },
                        // ).start();
                        this.empezarConteo.bind(this)
                        // return <View />;
                    }
                    relleno={() => {
                        return (
                            <Text style={estilos.sos}>
                                SOS
                            </Text>)
                    }} />
            )
        }

        if (this.state.tiempo == 1) {
            if (!this.state.completado) {
                var dato = this.props.state.locationEmergenciaReducer.region;

                if (dato) {
                    // var fechaActual = new Date();
                    // var fechaUbicacion = new Date(dato.timestamp);
                    // var tiempoTranscurrido = fechaActual.getTime() - fechaUbicacion.getTime();
                    // var tiempoTranscurridoSec = tiempoTranscurrido / 1000;

                    // if (tiempoTranscurridoSec > 20 || dato.accuracy > 25) {
                    // if (!this.state.ubicacionAntigua) {
                    //     this.state.ubicacionAntigua = true;
                    //     this.setState({ ...this.state });
                    // }
                    // return <View />
                    // // }
                }

                // if (!this.props.state.locationGoogleReducer.data) {
                //     if (this.props.state.locationGoogleReducer.estado == "cargando") {
                //         return <View />
                //     }
                //     this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                //         component: "locationGoogle",
                //         type: "geocode",
                //         data: dato,
                //         estado: "cargando"
                //     }, true);
                //     return <View />
                // }

                dato.direccion = this.props.state.locationGoogleReducer.data.direccion;
                console.log(dato)
                this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                    component: "emergencia",
                    type: "buscar",
                    data: dato,
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    estado: "cargando"
                }, true);
                this.props.state.locationGoogleReducer.data = false;
                this.state.completado = true;
                this.setState({ ...this.state });
            }

            return (
                <ButtonComponent name={"BtnSos"} onPress={() => {
                    return <View />;
                }}
                    relleno={() => {
                        return (
                            <Text style={{
                                position: "absolute",
                                // fontWeight: "bold",
                                fontSize: 20,
                                color: "#fff"
                            }}>
                                Completado
                            </Text>
                        )
                    }} />
            )
        }

        if (!this.state.estado) {
            this.contarTiempo();
        }
        var ubicacion = this.props.state.locationEmergenciaReducer.region;
        if (!ubicacion) {
            console.log(dato);
            alert("Porfavor Active su ubicacion");
            this.state.tiempo = false;
            this.getPosition();
            this.setState({ ...this.state });
            return <View />;
        }
        // if (ubicacion.accuracy > 20) {
        //     this.getPosition();
        // }
        return (
            <ButtonComponent name={"BtnSos"}
                onPress={() => {
                    this.state.tiempo = false;
                    this.setState({ ...this.state });
                    this.props.navigation.goBack(null)
                    return <View />;
                }}
                relleno={() => {
                    return (
                        <View style={{
                            position: "absolute",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                // position: "absolute",
                                // fontWeight: "bold",
                                fontSize: Dimensions.get("window").width * 0.13,
                                color: "#fff"
                            }}>
                                {this.state.tiempo - 1}
                            </Text>

                            <Text style={{
                                // position: "absolute",
                                color: "#fff",
                                fontSize: Dimensions.get("window").width * 0.03,
                                // fontWeight: "bold"
                            }}>
                                Cancelar.
                            </Text>
                        </View>
                    )
                }} />
        )
    }


    render() {

        if (this.props.state.emergenciaReducer.data) {
            const resetAction = StackActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({ routeName: "CargaPage", params: { resetOrder: 1 } })
                ],
            });
            this.props.navigation.dispatch(resetAction);
            return <View />
        }

        return (
            <View style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ImgFondoCruces />

                <ScrollView style={{
                    width: "100%",
                }}>
                    <View style={{
                        minHeight: Dimensions.get("window").height - 50
                    }}>

                        <View style={{
                            marginTop: 10,
                            alignContent: "center",
                            justifyContent: "center",
                            marginBottom: 30,
                            // backgroundColor: "#000"
                        }}>
                            <Text style={{
                                textAlign: "center",
                                fontSize: 30,
                                // fontStyle: "italic",
                                color: "#2C4C7E",
                                fontWeight: "bold"
                            }}>CONFIRMAR {'\n'} ASISTENCIA</Text>

                            <Text style={{
                                textAlign: "center",
                                fontSize: 15,
                                marginTop: 5,
                                // fontStyle: "italic",
                                color: "#2C4C7E",
                                fontWeight: "bold"
                            }}>Al precionar el botón SOS, estarás{'\n'}solicitando asistencia medica en {'\n'} el lugar donde estés.</Text>
                        </View>

                        <Animated.View style={{
                            marginTop: 12,
                            height: Dimensions.get('window').height * 0.42,
                            padding: 4,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            transform: [
                                {
                                    scale: this.state.startValue,
                                },
                            ],
                        }}>
                            {this.getButton()}

                        </Animated.View>

                        <View style={{ width: "100%", flex: 1, justifyContent: "flex-end", }}>

                            <ImgComponent name="logo1" />

                        </View>
                    </View>

                </ScrollView>
                {/* <PopupUbicacion visible={this.state.ubicacionAntigua} /> */}
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    sos: {
        position: "absolute",
        color: "#fff",
        fontSize: Dimensions.get("window").width * 0.12,
        fontWeight: "bold",
    },
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ConfirmarPageAux);

