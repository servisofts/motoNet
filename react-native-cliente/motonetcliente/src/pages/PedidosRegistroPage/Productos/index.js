import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Boton1 from '../../../component/Boton1';
import STextImput from '../../../component/STextImput';
import STheme from '../../../STheme';
import Svg from '../../../Svg';
import UUID from '../../../UUID';
export default class Productos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: {

            },
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
    getProductos = () => {
        return this.state.productos;
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
            flexDirection: "row",

        }}>
            <Svg resource={require("../../../img/addFoto.svg")} style={{
                width: 20,
                height: 20,
            }} />
            <Text style={{
                marginStart: 8,
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
                        color: STheme.color.background,
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
        var cantidad = this.state.cantidad;
        var producto = {
            key: UUID(),
            nombre: nombre,
            cantidad: cantidad,
        }
        this._ref["nombre"].clear();
        this.state.cantidad = 1;
        this.state.productos[nombre] = producto;
        this.setState({ ...this.state });
        // console.log(producto);
    }
    getlistaItems() {
        let data = this.state.productos;
        if (Object.keys(data).length <= 0) {
            return <View />
        };

        var LIST = Object.keys(data).map((key) => {
            var obj = data[key];
            return <View style={{
                height: 40,
                width: "100%",
                marginBottom: 8,
                flexDirection: "row"
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        color: STheme.color.textb
                    }}>{obj.nombre}</Text>
                    <Text style={{
                        color: STheme.color.textb
                    }}>{obj.cantidad} Unidades</Text>
                </View>
                <TouchableOpacity style={{
                    width: 40,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {
                    delete this.state.productos[key];
                    this.setState({ productos: this.state.productos })
                }}>
                    <Svg name={"Eliminar"} style={{
                        width: 20,
                        height: 20,
                        fill: "#000"
                    }} />
                </TouchableOpacity>
            </View>
        })

        return <View>
            <Text style={{
                color: STheme.color.textb,
                fontSize: 14,
                fontWeight: "bold",
            }}>Productos añadidos</Text>
            {LIST}
        </View>
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
                }}>¿Que necesitas que te llevemos?</Text>
                {this.getInput("nombre")}
                {this.agregarFoto()}
                {this.cantidad()}
                <View style={{
                    marginBottom: 16,
                }}>
                    <Boton1 label={"Añadir producto"} type={"4"} onPress={() => {
                        this.agergarProducto();
                    }} />
                </View>
                <View style={{
                    width: "100%",
                }}>
                    {this.getlistaItems()}
                </View>
            </View>
        );
    }
}
