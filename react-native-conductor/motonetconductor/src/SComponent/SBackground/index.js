import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import SImage from '../SImage';
type type = {
    source: Object,
    contraste: String

}
export default class SBackground extends Component<type> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getBackground = () => {
        var source = this.props.source;
        if (!source) {
            source = require("./background.png");
        }
        return <View style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            // opacity: 0.8,
            backgroundColor: "#ffffff",
            ...this.props.style,
        }}>
            <SImage
                source={source}
                // blurRadius={8 - (Platform.OS == "android" ? 4 : 0)}
                style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                }} />
            {/* <View style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                position: "absolute",
                opacity: (0.7 + (Platform.OS == "web" ? -0.2 : 0)),
                backgroundColor: (this.props.contraste ? this.props.contraste : "#00000044")
            }}>

            </View> */}
        </View>
    }
    render() {
        // if (!this.props.source) {
        //     return <View />
        // }
        return this.getBackground()
    }
}
