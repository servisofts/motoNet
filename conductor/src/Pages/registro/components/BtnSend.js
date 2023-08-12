import { Text, View } from 'react-native'
import React, { Component } from 'react'
import PButtom from '../../../Components/PButtom'

export default class BtnSend extends Component {
    render() {
        return (
            <PButtom
                width={"100%"}
                props={{
                    type: "outline"
                }}
                onPress={this.props.onPress}
            >{this.props.children}</PButtom>
        )
    }
}