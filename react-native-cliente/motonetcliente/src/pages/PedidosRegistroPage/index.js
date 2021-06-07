import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import BarraSuperior from '../../component/BarraSuperior';
import Boton1 from '../../component/Boton1';
import BottomContent from '../../component/BottomContent';
import SSCrollView from '../../component/SScrollView';
import STextImput from '../../component/STextImput';
import STheme from '../../STheme';

class PedidosRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this._ref = {};
        this.state = {
            datos: {
                nombre: {
                    label: "Nombre",
                    placeholder: "Ingresar nombre",
                    type: "text"
                },
                telefono: {
                    label: "Telefono",
                    placeholder: "Ingresar número",
                    type: "text"
                },
                nota: {
                    label: "Nota",
                    placeholder: "Nota",
                    type: "text"
                },
            }
        };
    }

    getInput(name) {
        return (<View style={{
            marginBottom: 16,
        }}>
            <STextImput theme={"2"} {...this.state.datos[name]} ref={(ref) => this._ref[name] = ref} />
        </View>)
    }
    render() {
        return (<View style={{
            width: "100%",
            flex: 1,
            backgroundColor: STheme.color.primary
        }}>
            <BarraSuperior title={"Pedidos"} goBack={() => { this.props.navigation.goBack() }} />
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
                                marginTop: 16,
                                marginBottom: 16,
                                fontSize: 16,
                                fontWeight: "bold",
                                color: STheme.color.textb
                            }}>Detalle del encargo</Text>
                            {this.getInput("nombre")}
                            {this.getInput("telefono")}
                            {this.getInput("nota")}
                            <Text style={{
                                marginTop: 16,
                                marginBottom: 16,
                                fontSize: 16,
                                fontWeight: "600",
                                color: STheme.color.textb
                            }}>¿Que necesitas que te llevemos?</Text>
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
export default connect(initStates)(PedidosRegistroPage);