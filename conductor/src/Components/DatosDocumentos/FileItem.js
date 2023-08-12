import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SImage, SInput, SList, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getExtencion(name) {
        if(!name) return "";
        var arr = name.split(".");
        if (arr) {
            return arr[arr.length - 1]
        }
        return "";
    }
    render() {
        const { name, path } = this.props
        var extencion = this.getExtencion(name)
        return (
            <SView width={80} onPress={() => {
                SNavigation.openURL(path + name)
            }} center>
                <SView width={80} height={80} card>
                    <SView style={{
                        position: "absolute"
                    }} center col={"xs-12"} height>
                        <SText color={STheme.color.lightGray}>{extencion}</SText>
                    </SView>
                    <SImage src={path + name} />

                </SView>
                <SView flex col={"xs-11"} style={{
                    overflow: "hidden"
                }} row>
                    <SText center fontSize={10} >{name}</SText>
                </SView>
            </SView >
        );
    }
}
export default (index);