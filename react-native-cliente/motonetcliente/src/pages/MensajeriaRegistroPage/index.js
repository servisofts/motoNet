import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import BarraSuperiorMensajeria from './BarraSuperiorMensajeria';
import SSCrollView from '../../component/SScrollView';
import STextImput from '../../component/STextImput';
import STheme from '../../STheme';
import SwitchTipo from './SwitchTipo';
import BuscardorNuevoBlack from '../../component/BuscardorNuevoBlack';
import Svg from '../../Svg';
class MensajeriaRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this._ref = {};
        this.state = {
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

        var foto = null;//TODO


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
            direcciones:{
                 
            },
            paquete: {
                tipo,
                foto,
            },
            inicio: {
                nombre: nombreD,
                telefono: telefonoD,
                nota: notaD,
            },
            destino: {
                nombre: nombreR,
                telefono: telefonoR,
                nota: notaR
            },
            direccionI,
            direccionF

        }
        console.log(OBJ)
    }
    render() {
        return (<View style={{
            width: "100%",
            flex: 1,
            backgroundColor: STheme.color.primary
        }}>
            <BarraSuperiorMensajeria
                title={"Mensajeria"}
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
                            }}>Mensajería que vas a enviar?</Text>
                            <SwitchTipo ref={(ref) => { this.switchtipo = ref; }} />
                            <View style={{
                                marginTop: 16,
                                borderWidth: 1,
                                height: 200,
                                borderRadius: 8,
                                borderColor: "#666",
                                justifyContent: "center",
                                alignItems: "center"
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
                            </View>
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
                                navigation={this.props.navigation} label={"Donde reogemos el encargo"} />

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
                                navigation={this.props.navigation} label={"Donde dejamos el encargo"} />
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