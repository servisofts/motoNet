import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';
import BarraSuperiorMensajeria from './BarraSuperiorMensajeria';
import SSCrollView from '../../component/SScrollView';
import STextImput from '../../component/STextImput';
import STheme from '../../STheme';
import SwitchTipo from './SwitchTipo';
import BuscardorNuevoBlack from '../../component/BuscardorNuevoBlack';
import Svg from '../../Svg';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'

class MensajeriaRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this._ref = {};
        this.state = {
            foto: false,
            datos: {
                nombreR: {
                    label: "Nombre",
                    placeholder: "Ingresar nombre",
                    type: "text"
                },
                telefonoR: {
                    label: "Telefono",
                    placeholder: "Ingresar número",
                    type: "text"
                },
                notaR: {
                    label: "Nota",
                    placeholder: "Nota",
                    type: "textarea",
                    height: 120,
                },
                nombreD: {
                    label: "Nombre",
                    placeholder: "Ingresar nombre",
                    type: "text"
                },
                telefonoD: {
                    label: "Telefono",
                    placeholder: "Ingresar número",
                    type: "text"
                },
                notaD: {
                    label: "Nota",
                    placeholder: "Nota",
                    type: "textarea",
                    height: 120,
                },

            }
        };
    }

    getInput(name) {
        return (<View style={{
            marginBottom: 8,
        }}>
            <STextImput theme={"2"} {...this.state.datos[name]} ref={(ref) => this._ref[name] = ref} />
        </View>)
    }

    pedirViaje() {
        var isValid = true;

        var tipo = this.switchtipo.getValue();

        // var foto = null;//TODO

        var direccionI = this.direccionInicio.getValue();
        var direccionF = this.direccionFin.getValue();

        if (!direccionI) {
            this.direccionInicio.setError(true);
            isValid = false;
        }
        if (!direccionF) {
            this.direccionFin.setError(true);
            isValid = false;
        }
        var nombreR = this._ref["nombreR"].verify();
        if (!nombreR) {
            console.log("entro");
            isValid = false
        };
        var telefonoR = this._ref["telefonoR"].verify();
        if (!telefonoR) {
            console.log("entro");
            isValid = false
        };
        var notaR = this._ref["notaR"].getValue();

        var nombreD = this._ref["nombreD"].verify();
        if (!nombreD) {
            console.log("entro");
            isValid = false
        };
        var telefonoD = this._ref["telefonoD"].verify();
        if (!telefonoD) {
            console.log("entro");
            isValid = false
        };
        var notaD = this._ref["notaD"].getValue();
        if (!isValid) {
            return;
        }
        var OBJ = {
            tipo_viaje: "mensajeria",
            paquete: {
                tipo,
                foto: this.state.foto,
            },
            inicio: {
                nombre: nombreD,
                telefono: telefonoD,
                nota: notaD,
            },
            fin: {
                nombre: nombreR,
                telefono: telefonoR,
                nota: notaR
            },
            direccionInicio: direccionI,
            direccionFin: direccionF

        }
        // console.log(OBJ)
        this.props.navigation.navigate("ViajePedirYBuscar", {
            data: OBJ
        });
    }

    pickPhoto = () => {
        var options = {
            title: 'Seleccionar una Foto',
            takePhotoButtonTitle: "Tomar Foto...",
            chooseFromLibraryButtonTitle: "Elegir de la Biblioteca...",
            allowEditing: true,
            isVertical: true,
            originalRotation: 0,
            mediaType: 'foto',
            // rotation: 0,
            cancelButtonTitle: "Cancelar",
            storageOptions: {
                skipBackup: true,
                path: 'image',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                return <View />
            } else if (response.error) {
                return <View />
            } else if (response.customButton) {
                return <View />
            } else {
                var originalRotation = (!response.originalRotation ? 0 : response.originalRotation)
                ImageResizer.createResizedImage("data:image/jpeg;base64," + response.data, 400, 400, 'PNG', 100, originalRotation).then((uri) => {
                    //console.log(uri)
                    RNFS.readFile(uri.path, 'base64').then((resp) => {
                        //console.log(resp)
                        this.setState({ foto: resp })
                    });

                }).catch(err => {
                    console.log(err);
                });
            }
        });
        return <View />
    }

    agregarFoto = () => {

        if (this.state.foto) {
            return (
                <View style={{
                    width: "100%",
                    // justifyContent: "center",
                    // alignItems: "center",
                    // marginBottom: 8,
                    marginTop: 16,
                    // borderWidth: 1,
                    height: 200,
                    // borderRadius: 8,
                    // borderColor: "#666",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.foto }}
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: 4,
                            resizeMode: "stretch"
                        }} />
                </View>
            )
        }

        return (
            <TouchableOpacity style={{
                marginTop: 16,
                borderWidth: 1,
                height: 200,
                borderRadius: 8,
                borderColor: "#666",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                this.pickPhoto()
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Svg resource={require("../../img/addFoto.svg")} style={{
                        width: 25,
                        height: 25
                    }} />
                    <Text style={{
                        marginStart: 8,
                        color: "#000"
                    }}>Agregar foto</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (<View style={{
            width: "100%",
            flex: 1,
            backgroundColor: STheme.color.primary
        }}>
            <BarraSuperiorMensajeria
                title={"Mensajería"}
                goBack={() => { this.props.navigation.goBack() }}
                pedir={() => this.pedirViaje()} />
            <View style={{
                flex: 1,
            }}>
                <SSCrollView>
                    <View style={{
                        flex: 1,
                        width: "100%",
                        alignItems: "center",
                    }}>
                        <View style={{
                            width: "90%"
                        }}>
                            <Text style={{
                                marginTop: 8,
                                marginBottom: 8,
                                fontSize: 16,
                                fontWeight: "bold",
                                color: STheme.color.textb
                            }}>Mensajería: ¿qué vas a enviar?</Text>
                            <SwitchTipo ref={(ref) => { this.switchtipo = ref; }} />

                            {this.agregarFoto()}

                            <Text style={{
                                marginTop: 8,
                                marginBottom: 8,
                                fontSize: 16,
                                fontWeight: "bold",
                                color: STheme.color.textb
                            }}>Detalle del envío</Text>
                            <Text style={{
                                marginBottom: 8,
                                fontSize: 12,
                                fontWeight: "bold",
                                color: STheme.color.textb
                            }}>Remitente</Text>

                            <BuscardorNuevoBlack
                                ref={(ref) => { this.direccionInicio = ref }}
                                navigation={this.props.navigation} label={"¿Dónde recogemos el encargo?"} />

                            {this.getInput("nombreR")}
                            {this.getInput("telefonoR")}
                            {this.getInput("notaR")}

                            <View style={{
                                width: "100%",
                                height: 1,
                                marginTop: 16,
                                marginBottom: 32,
                                backgroundColor: "#666"
                            }}>

                            </View>

                            <Text style={{
                                marginBottom: 8,
                                fontSize: 12,
                                fontWeight: "bold",
                                color: STheme.color.textb
                            }}>Destinatario</Text>
                            <BuscardorNuevoBlack
                                ref={(ref) => { this.direccionFin = ref }}
                                navigation={this.props.navigation} label={"¿Dónde dejamos el encargo?"} />
                            {this.getInput("nombreD")}
                            {this.getInput("telefonoD")}
                            {this.getInput("notaD")}
                        </View>

                    </View>
                </SSCrollView>
            </View>
        </View>)
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(MensajeriaRegistroPage);