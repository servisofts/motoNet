
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SInput, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';

class ChangeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-11"} center >
                <SView col={"xs-12"} height={50} row onPress={() => {
                    if (this.props.onPress) {
                        this.props.onPress();
                    }
                    if (this.props.type) {
                        this.props.parent.setState({ type: this.props.type });
                    }
                }}>
                    <SView width={50} height center>
                        <SIcon name='pointer' width={30} />
                    </SView>
                    <SView width={8} />
                    <SView height flex style={{
                        justifyContent: "center"
                    }}>
                        <SView flex style={{
                            justifyContent: "center"
                        }}>
                            <SText fontSize={14}>{this.props.label}</SText>
                        </SView>
                        <SHr height={1} color={STheme.color.lightGray} />
                    </SView>
                </SView>
            </SView>
        );
    }
}

export default (ChangeItem);