import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { SButtom, SHr, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Boton1 from '../../../../Components/Boton1';
import Model from '../../../../Model';

export default class no_conductor_disponible extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage center hidden disableScroll>
                <SView col={"xs-12"} height backgroundColor={STheme.color.primary} center>
                    <SView style={{
                        width: 300,
                        height: 250,
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        // justifyContent: "center",
                        // alignItems: "center"
                    }} center>
                        <SText fontSize={16} center>{'Lo sentimos no encontramos conductores disponibles.'}</SText>
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
                                    label="Salir"
                                    type="4"
                                    onPress={() => {
                                        Model.viaje.Action.action("cancelar", this.props.viaje.key).then((resp) => {
                                            Model.viaje.Action.CLEAR();
                                        })
                                    }}
                                    cargando={false} />
                            </View>
                            <View style={{
                                width: 100
                            }}>
                                <Boton1
                                    label="Reintentar"
                                    type="1"
                                    onPress={() => {
                                        Model.viaje.Action.action("buscar_conductor", this.props.viaje.key).then((resp) => {

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
