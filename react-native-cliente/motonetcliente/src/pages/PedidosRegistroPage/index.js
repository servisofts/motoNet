import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import BarraSuperiorPedidos from './BarraSuperiorPedidos';
import Boton1 from '../../component/Boton1';
import BottomContent from '../../component/BottomContent';
import SSCrollView from '../../component/SScrollView';
import STextImput from '../../component/STextImput';
import STheme from '../../STheme';
import Productos from './Productos';

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
    pedirViaje(direccion) {
        var isValid = true;

        // var direccionI = this.direccionInicio.getValue();

        if (!direccion) {
            alert("Ingrese a dónde llevaremos el encargo.")
            isValid = false;
        }
        var nombre = this._ref["nombre"].verify();
        if (!nombre) {
            console.log("entro");
            isValid = false
        };
        var telefono = this._ref["telefono"].verify();
        if (!telefono) {
            console.log("entro");
            isValid = false
        };
        var nota = this._ref["nota"].getValue();


        var productos = this.productos.getProductos();

        if (Object.keys(productos).length <= 0) {
            alert("Ingrese por lo menos 1 producto.")
            isValid = false
        }
        if (!isValid) {
            return;
        }
        var OBJ = {
            tipo_viaje: "pedido",
            inicio: {
                nombre: nombre,
                telefono: telefono,
                nota: nota,
            },
            productos: productos,
            direccionInicio:direccion,

        }
        this.props.navigation.navigate("ViajePedirYBuscar",{
            data:OBJ
        });
        console.log(OBJ)
    }
    render() {
        return (<View style={{
            width: "100%",
            flex: 1,
            backgroundColor: STheme.color.primary
        }}>
            <BarraSuperiorPedidos
                pedir={(direccion) => {
                    this.pedirViaje(direccion);
                }}
                title={"Pedidos"}
                navigation={this.props.navigation}
                goBack={() => { this.props.navigation.goBack() }}
            />
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
                            }}>Detalle del encargo</Text>
                            {this.getInput("nombre")}
                            {this.getInput("telefono")}
                            {this.getInput("nota")}
                            <Productos ref={(ref) => { this.productos = ref; }} />
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
export default connect(initStates)(PedidosRegistroPage);