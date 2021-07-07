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
                    type: "text",
                    key_db: "Nombres",
                },
                apellidos: {
                    label: "Apellidos",
                    ph: "Ingresar apellidos",
                    type: "text",
                    key_db: "Apellidos",
                },
                telefono: {
                    label: "Telefono",
                    ph: "Ingresar telefono",
                    type: "text",
                    key_db: "Telefono",
                },
                ci: {
                    label: "Carnet de identidad",
                    ph: "Ingresar ci",
                    type: "text",
                    key_db: "CI",
                },
                correo: {
                    label: "Correo",
                    ph: "Ingresar correo",
                    type: "email",
                    key_db: "Correo",
                },
                pass: {
                    label: "Contraseña",
                    ph: "Ingresar contraseña",
                    type: "password",
                    key_db: "Password",
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
    getKeyDato = (keyDescripcion) => {
        var key = "undefined"
        var cabecera = "registro_cliente";
        for (let i = 0; i < this.props.state.cabeceraDatoReducer.data[cabecera].length; i++) {
            const obj = this.props.state.cabeceraDatoReducer.data[cabecera][i];
            if (obj.dato.descripcion == keyDescripcion) {
                return obj;
            }
        }
        return {
            key
        }
    }
    getDatoCabecera = () => {
        if (this.props.state.cabeceraDatoReducer.estado == "cargando") {
            return <View />
        }
        if (!this.props.state.cabeceraDatoReducer.data["registro_cliente"]) {
            var objSend = {
                component: "cabeceraDato",
                type: "getDatoCabecera",
                estado: "cargando",
                cabecera: "registro_cliente"
            }
            this.props.state.socketClienteReducer.sessiones["motonet"].send(objSend, true);
            return <View />
        }
        return <View />
    }
    render() {
        //Dentro de render verifico si registro usuario con usuarioLog
        if(this.props.state.usuarioReducer.usuarioLog){
            this.props.navigation.replace("CargaPage")
        }
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
                        {this.getDatoCabecera()}
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
                                    var isValid = true;
                                    var arr = [];
                                    var validarPass = "";
                                    Object.keys(this.state.datos).map((key) => {
                                        var data = this.state.datos[key];
                                        var value = this._ref[key].verify();
                                        if (!value) isValid = false;
                                        //alert("dato:" + value + " ** " + JSON.stringify(data));
                                        if(data.type=="password"){
                                            if(validarPass == ""){
                                                validarPass = value;
                                            }else{
                                                if(validarPass != value){
                                                    alert("La contraseña no coinciden")
                                                    validarPass="";
                                                    isValid = false
                                                    return <div/>
                                                }
                                            }
                                            
                                        }
                                        if (data["key_db"]) {
                                            var cabeceraDato = this.getKeyDato(data["key_db"]);
                                            //alert(JSON.stringify(cabeceraDato) + " " + value)
                                            arr.push({
                                                dato: cabeceraDato,
                                                data: value,
                                            })
                                        }
                                    })
                                    if (isValid) {
                                        // var objSend = {
                                        //     component: "usuario",
                                        //     type: "registro",
                                        //     estado: "cargando",
                                        //     cabecera: "registro_cliente",
                                        //     data: arr
                                        // }
                                        // this.props.state.socketClienteReducer.sessiones["motonet"].send(objSend, true);
                                        alert("Registrar")
                                    }

                                    

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