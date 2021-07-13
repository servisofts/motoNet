import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Boton1 from '../../../component/Boton1';
import STextImput from '../../../component/STextImput';
import STheme from '../../../STheme';

export default class Productos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: {
                nombre: {
                    placeholder: "Nombre o detalle del producto",
                    type: "textarea",
                    height: 100,
                },

            },
            cantidad: 1,
        };
        this._ref = {};
    }
    getInput(name) {
        return (<View style={{
            marginBottom: 8,
        }}>
            <STextImput theme={"2"} {...this.state.datos[name]} ref={(ref) => this._ref[name] = ref} />
        </View>)
    }
    agregarFoto() {
        return <TouchableOpacity style={{
            width: "100%",
            height: 50,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: STheme.color.placeholder,
            borderStyle: "dashed",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,

        }}>
            <Text style={{
                color: STheme.color.textb,
            }}>Agregar foto</Text>
        </TouchableOpacity>
    }
    cantidad() {
        return <View style={{
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
            flexDirection: "row"

        }}>
            <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                color: STheme.color.textb,
            }}>Cantidad</Text>
            <View style={{
                flex: 1,
            }}>

            </View>
            <View style={{
                width: 100,
                height: 40,
                borderRadius: 100,
                backgroundColor: "#eee",
                flexDirection: "row",
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {
                    if (this.state.cantidad - 1 <= 0) {
                        return;
                    }
                    this.setState({ cantidad: this.state.cantidad - 1 })
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: STheme.color.textb,
                    }}>-</Text>
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: STheme.color.textb,
                    }}>{this.state.cantidad}</Text>

                </View >
                <TouchableOpacity style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {
                    this.setState({ cantidad: this.state.cantidad + 1 })
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: STheme.color.textb,
                    }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    agergarProducto() {
        var nombre = this._ref["nombre"].verify();
        if (!nombre) {
            return;
        }
        alert(nombre)
    }
    render() {
        return (
            <View style={{
                width: "100%"
            }}>
                <Text style={{
                    marginBottom: 8,
                    fontSize: 16,
                    fontWeight: "700",
                    color: STheme.color.textb
                }}>¿Qué necesitas que te llevemos?</Text>
                {this.getInput("nombre")}
                {this.agregarFoto()}
                {this.cantidad()}
                <View style={{
                    marginBottom: 16,
                }}>
                    <Boton1 label={"Agregar producto"} type={"4"} onPress={() => {
                        this.agergarProducto();
                    }} />
                </View>
            </View>
        );
    }
}
