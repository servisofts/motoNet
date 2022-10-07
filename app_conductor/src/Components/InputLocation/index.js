import React, { Component } from 'react';
import { SIcon, SInput, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
type InputLocationProps = {
    icon?: String,
    placeholder?: String,
    onChange?: Function,
    defaultValue?: any,
    disabled?: Boolean,
    secondary?: Boolean
}
class InputLocation extends Component<InputLocationProps> {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                direccion: "",
                latitude: 0,
                longitude: 0
            }
        };

        if (this.props.defaultValue) {
            this.state.location = this.props.defaultValue;
        }
    }
    getValue() {
        return this.state.location
    }
    formatDir(dir) {
        if (!dir) return;
        var arr = dir.split(/\,/g);
        return (arr[0] ?? "") + (!!arr[1] ? "," + arr[1] : "")
    }
    render() {
        if (this.props.value) {
            this.state.location = this.props.value;
        }
        return (
            <SView col={"xs-12"} center>
                <SView col={"xs-12"} onPress={() => {
                    if (this.props.disabled) return;
                    SNavigation.navigate("/direccion", {
                        location: this.state.location,
                        onSelect: (obj) => {
                            this.state.location = obj;
                            if (this.props.onChange) {
                                this.props.onChange(obj);
                            }
                            this.setState({
                                ...this.state
                            })
                        }
                    })
                }}>
                    <SInput
                        disabled
                        icon={<SView width={30} center height>
                            <SIcon name={this.props.icon ?? "Marker"} fill={this.props.secondary ? STheme.color.text : STheme.color.secondary} width={20} height={20} />
                        </SView>}
                        type="default"
                        customStyle={this.props.secondary ? "" : "motonet"}
                        value={this.formatDir(this.state.location.direccion)}
                        placeholder={this.props.placeholder ?? "Buscar destino"}
                        style={{
                            height: 40,

                        }} />
                </SView>
            </SView >
        );
    }
}

export default (InputLocation);