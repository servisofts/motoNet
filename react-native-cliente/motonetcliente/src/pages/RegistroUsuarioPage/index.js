import React, { Component } from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux';
import BarraSuperior from '../../component/BarraSuperior';
import Boton1 from '../../component/Boton1';
import BottomContent from '../../component/BottomContent';
import SSCrollView from '../../component/SScrollView';
import STextImput from '../../component/STextImput';

class RegistroUsuarioPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this._ref = {};
        this.state = {
            datos: {
                nombres: {
                    label: "Nombres",
                    ph: "Ingresar nombres",
                    type: "text"
                },
                apellidos: {
                    label: "Apellidos",
                    ph: "Ingresar apellidos",
                    type: "text"
                },
                telefono: {
                    label: "Telefono",
                    ph: "Ingresar telefono",
                    type: "text"
                },
                ci: {
                    label: "Carner de identidad",
                    ph: "Ingresar ci",
                    type: "text"
                },
                correo: {
                    label: "Correo",
                    ph: "Ingresar correo",
                    type: "email"
                },
                pass: {
                    label: "Contraseña",
                    ph: "Ingresar contraseña",
                    type: "password"
                },
                rep_pass: {
                    label: "Confirmar contraseña",
                    ph: "Ingresar contraseña",
                    type: "password"
                },
            }
        };
    }

    getInputs() {
        return Object.keys(this.state.datos).map((key) => {
            var obj = this.state.datos[key];
            return (<View style={{
                marginBottom: 16,
            }}>
                <STextImput label={obj.label} placeholder={obj.ph} type={obj.type} ref={(ref) => this._ref[key] = ref} />
            </View>)
        })
    }
    render() {
        return (<View style={{
            width: "100%",
            flex: 1,
        }}>
            <BarraSuperior title={"Crear usuario"} goBack={() => { this.props.navigation.goBack() }} />
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
                            {this.getInputs()}
                        </View>
                        <BottomContent>
                            <Boton1 type={"1"}
                                label={"Registrarse"}
                                cargando={this.props.state.usuarioReducer.estado == "cargando"}
                                onPress={() => {
                                    Object.keys(this.state.datos).map((key) => {
                                            this._ref[key].verify();

                                    })
                                }}
                            />
                        </BottomContent>
                    </View>
                </SSCrollView>
            </View>
        </View>)
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegistroUsuarioPage);