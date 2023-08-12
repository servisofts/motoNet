import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SImage, SLoad, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import BarraCargando from '../BarraCargando';
export type PerfilConductorPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<PerfilConductorPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;
        this.props.onPress(this.props.data)
    }

    render() {
        var key_conductor = this.props.data.key_conductor;

        var data = Model.usuario.Action.getByKey(key_conductor)
        if (!data) return <SLoad />

        var { key, Nombres, Apellidos, Telefono } = data;
        console.log("nuevamente ", data)
        return (
            <SView
                width={320}
                height={124} style={{
                    borderRadius: 8,
                    backgroundColor: STheme.color.accent,
                    borderColor: "#AAAAAA22",
                    borderWidth: 2,
                    borderTopWidth: 0,
                    borderBottomWidth: 3,
                    overflow: "hidden",
                    padding: 8,
                }}
                activeOpacity={1}
                onPress={!this.props.onPress ? null : this.handlePress.bind(this)}>
                <SText color={STheme.color.secondary}>Conductor</SText>
                <SHr />


                {/* <SView style={{
					width: 50,
					height: 50, borderRadius: 30, overflow: "hidden", borderWidth: 1, borderColor: "#fff"
				}}>
					<SImage src={SSocket.api.root + "usuario/" + key + "?date=" + new Date().getTime()} style={{
						width: "100%",
						height: "100%",
						resizeMode: "cover"
					}} />
				</SView> */}


                <SView row >
                    <SText fontSize={12} color={"white"} >Nombre completo: {Nombres} {Apellidos}</SText>
                    <SView width={8} />
                    <SText fontSize={12} color={"white"} >Teléfono: {Telefono}</SText>
                </SView>
                <SHr />
                <BarraCargando />
                <SView col={"xs-12"} center>
                    <SHr height={8} />
                    <SText color={STheme.color.secondary} fontSize={11}>{"Chatea conductor > "}</SText>
                    <SHr height={8} />
                </SView>
            </SView>

        );
    }
}
export default (index);