import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Boton1 from '../../../component/Boton1';
import STextImput from '../../../component/STextImput';
import STheme from '../../../STheme';
import Svg from '../../../Svg';
import UUID from '../../../UUID';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import urlFoto from "../../../Json/index.json";

class Productos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foto: false,
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
        return (
            <View style={{
                marginBottom: 8,
            }}>
                <STextImput theme={"2"} {...this.state.datos[name]} ref={(ref) => this._ref[name] = ref} />
            </View>
        )
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

    agregarFoto() {
        if (this.state.foto) {
            return (
                <View style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 8,
                }}>
                    <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.foto }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 4,
                        }} />
                </View>
            )
        }

        return (
            <TouchableOpacity style={{
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
            }} onPress={() => {
                this.pickPhoto()
                // alert("sdfds")
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
        )
    }

    cantidad() {
        return (
            <View style={{
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
                        }}>{this.state.cantidad}
                        </Text>

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
        )
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
            foto: this.state.foto
        }
        this._ref["nombre"].clear();
        this.state.cantidad = 1;
        this.state.productos[nombre] = producto;
        this.state.foto = false;
        this.setState({ ...this.state });
        // console.log(producto); alvaroaqui
    }
    getlistaItems() {
        let data = this.state.productos;
        if (Object.keys(data).length <= 0) {
            return <View />
        };

        var LIST = Object.keys(data).map((key) => {
            var obj = data[key];
            return (
                <View style={{
                    height: 40,
                    width: "100%",
                    marginBottom: 15,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        // flex: 1,
                    }}>
                        <Text style={{
                            color: STheme.color.textb
                        }}>{obj.nombre}</Text>
                        {/* <Text style={{
                            color: STheme.color.textb
                        }}>100 Unidades</Text> */}

                    </View>

                    <Image source={{ uri: 'data:image/jpeg;base64,' + obj.foto }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 4,
                        }} />

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
            )
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
                }}>¿Qué necesitas que te llevemos?</Text>
                {this.getInput("nombre")}

                {this.agregarFoto()}
                {/* {this.cantidad()} */}





                <View style={{
                    marginBottom: 16,
                }}>



                    <Boton1 label={"Añadir producto"} type={"4"} onPress={() => {
                        // SPopupOpen({
                        //      content: (
                        //         <View alignItems="center" >
                        //             <Svg name={"Warning2"}
                        //                 style={{
                        //                     width: 100,
                        //                     height: 100,
                        //                     fill: "#f00",
                        //                 }} />
                        //             <Text style={{ paddingTop: 10, fontSize: 15 }}>Posicione la ubicación en el mapa.</Text>
                        //         </View>
                        //     )
                        // })
                        this.agergarProducto();
                    }} />
                </View>

                <View style={{
                    width: "100%",
                    paddingBottom: 10
                }}>
                    {this.getlistaItems()}
                </View>
            </View>
        );
    }
}

export default Productos;
