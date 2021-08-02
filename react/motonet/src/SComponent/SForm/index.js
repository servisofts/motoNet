import React, { Component, ViewStyle } from 'react';
import { View, Text } from 'react-native';
import { SButtom } from '../SButtom';
import { SInput, TypeInputProps } from '../SInput';
import { SView, SViewPropsType } from '../SView';
import { Col, TypeCol } from '../SView/cols';



interface InputsTp {
    [index: string]: TypeInputProps;
}
export type SFromProps = {
    style: ViewStyle,
    props: SViewPropsType,
    inputProps: TypeInputProps,
    inputs: InputsTp,
    onSubmit: Function,
}
export default class SForm extends Component<SFromProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
        this._ref = {};
    }
    getButtom() {
        if (!this.props.onSubmit) return <View />
        return <SButtom
            props={{
                type: "danger",
                col: "xs-12 md-6",
                // customStyle: "primary",
            }} onPress={() => {
                var data = {};
                var isValid = true;
                Object.keys(this._ref).map((key) => {
                    var input: SInput = this._ref[key];
                    if (!input.verify()) {
                        isValid = false;
                    }
                    data[key] = input.getValue();
                })
                if (isValid) {
                    this.props.onSubmit(data);
                }
            }}>
            REGISTRAR
        </SButtom>
    }
    getInputs() {
        if (!this.props.inputs) {
            return <View />
        }

        return Object.keys(this.props.inputs).map((key) => {
            var inputProps = this.props.inputs[key];
            return <SInput
                ref={(ref) => { this._ref[key] = ref }}
                placeholder={inputProps.label}
                {...inputProps}
                props={{
                    ...this.props.inputProps,
                    ...inputProps
                }}
                //defaultValue={(inputProps.defaultValue) ? inputProps.defaultValue : ""}
                defaultValue={inputProps.defaultValue}
                />
        })
    }

    render() {
        return (
            <SView props={this.props.props}>
                {this.getInputs()}
                <SView style={{
                    height:14,
                }}></SView>
                {this.getButtom()}
            </SView>
        );
    }
}
SForm.defaultProps = {
    props: {

    }
}