import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import STheme from '../../STheme';
import Svg from '../../Svg';

type tprops = {
    label: String,
    type: String,
    placeholder: String,
    theme: String,
}
export default class STextImput extends Component<tprops> {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isSecure: true,
        };
        this.initTheme()

    }
    initTheme() {
        switch (this.props.theme) {
            case "2":
                this.theme = {
                    labelColor: STheme.color.textb,
                    boderColor: STheme.color.textb,
                    placeholder: STheme.color.textb,
                    color: STheme.color.textb
                }
                return;
            default:
                this.theme = {
                    labelColor: STheme.color.text,
                    boderColor: STheme.color.text,
                    placeholder: STheme.color.placeholder,
                    color: STheme.color.text
                }
                return;
        }

    }
    verify() {

        if (this.state.value) {
            this.state.value = this.state.value.trim();
            this.setState({ error: false })
            return this.state.value;
        }
        this.setState({ error: true })
        return false;
    }
    clear() {
        this.setState({ value: "" })
    }
    getIsSecure() {
        if (this.props.type != "password") {
            return false;
        }
        return this.state.value ? this.state.isSecure : false
    }
    getTextArea() {
        if (this.props.type != "textarea") {
            return false;
        }
        return {
            textAlignVertical: "top",
            multiline: true,
            numberOfLines: 5,
        }
    }
    getVerPass() {
        if (this.props.type != "password") {
            return <View />
        }
        return <TouchableOpacity style={{
            position: "absolute",
            right: 0,
            width: 40,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
        }} onPress={() => {
            this.setState({ isSecure: !this.state.isSecure })
        }}>
            <Svg resource={require("../../img/see.svg")} style={{
                width: 20,
                height: 20,
                fill: STheme.color.text,
            }} />
            {this.state.isSecure ? <Svg resource={require("../../img/see2.svg")} style={{
                position: "absolute",
                width: 20,
                height: 20,
                fill: STheme.color.text,
            }} /> : <View />}

        </TouchableOpacity>
    }
    getLabel() {
        if (!this.props.label) return <View />
        return (<Text style={{
            color: this.theme.labelColor,
            height: 25,
        }}>{this.props.label + (this.state.error ? "**" : "")}</Text>)
    }
    getImput({ }) {
        return (
            <View style={{
                width: "100%",
            }}>

                {this.getLabel()}
                <View>
                    <TextInput style={{
                        width: "100%",
                        height: this.props.height ? this.props.height : 50,
                        borderWidth: 1,
                        borderColor: this.theme.boderColor,
                        borderRadius: 4,
                        paddingStart: 8,
                    }}

                        {...this.getTextArea()}

                        value={this.state.value}
                        onChangeText={(text) => {
                            this.setState({ value: text });
                        }}
                        secureTextEntry={this.getIsSecure()}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.theme.placeholder}
                        color={this.theme.color}
                        autoCapitalize='none'
                    />
                    {this.getVerPass()}
                </View>
            </View>
        );
    }
    render() {
        return this.getImput({});
    }
}
