import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { SButtom, SHr, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Boton1 from '../../../../Components/Boton1';
import Model from '../../../../Model';

export default class en_negociacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getCondutor = () => {
        var movimiento = this.props.viaje.movimientos[0];
        var negociacion = movimiento.data
        var data = Model.usuario.Action.getByKey(negociacion.key_conductor);
        if (!data) return <SLoad />
        return (
            <View style={{
                alignItems: "center"
            }}>
                <View style={{
                    backgroundColor: "#ccc",
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    marginTop: 10,
                    marginBottom: 10
                }}>
                </View>
                <Text>
                    {data["Nombres"]} {data["Apellidos"]}
                </Text>
                <Text>
                    {data["Correo"]}
                </Text>
                <Text style={{
                    color: "#000",
                    fontSize: 20,
                    fontWeight: "bold"
                }}>Bs. {SMath.formatMoney(negociacion.oferta)}</Text>

            </View>
        )
    }
    render() {
        console.log(this.props.viaje);
        var movimiento = this.props.viaje.movimientos[0];
        var negociacion = movimiento.data

        return (
            <SPage center hidden disableScroll>
                <SView col={"xs-12"} height center backgroundColor={STheme.color.primary}>
                    {/* <SText fontSize={32}>{}</SText> */}
                    <SView style={{
                        width: 300,
                        height: 250,
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        // justifyContent: "center",
                        // alignItems: "center"
                    }} center>
                        {this.getCondutor()}
                        <SHr />
                        <View style={{
                            width: "100%",
                            justifyContent: "space-evenly",
                            flexDirection: "row",
                            alignItems: "center",
                            // backgroundColor: "#ccc"
                        }}>
                            <View style={{
                                width: 100
                            }}>
                                <Boton1
                                    label="Buscar Otro"
                                    type="4"
                                    onPress={() => {
                                        Model.viaje.Action.action("denegar_negociacion", this.props.viaje.key, {

                                        }).then((resp) => {
                                            // Model.viaje.Action.CLEAR();
                                            console.log(resp);
                                        })
                                    }}
                                    cargando={false} />
                            </View>
                            <View style={{
                                width: 100
                            }}>
                                <Boton1
                                    label="Aceptar"
                                    type="1"
                                    onPress={() => {
                                        Model.viaje.Action.action("aceptar_negociacion", this.props.viaje.key, {

                                        }).then((resp) => {
                                            // Model.viaje.Action.CLEAR();
                                            console.log(resp);
                                        })
                                    }}
                                    cargando={false} />
                            </View>
                        </View>
                    </SView>
                </SView>
            </SPage>
        );
    }
}
