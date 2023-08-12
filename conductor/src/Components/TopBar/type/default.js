import React, { Component } from 'react';
import { SIcon, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { goBackPrevent } from '.';

class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center>
                <SView center col={"xs-12"} height={40} row>
                    <SView width={50} height center onPress={() => {
                        goBackPrevent(this);
                    }}>
                        <SIcon name={"Arrow"} width={20} fill={STheme.color.secondary} />
                    </SView>
                    <SView flex height center>
                        <SText col={"xs-12"} bold color={STheme.color.secondary} fontSize={16}>{this.props.title}</SText>
                    </SView>
                    <SView height center>
                        {this.props.leftContent}
                    </SView>
                </SView>
                {this.props.children}
            </SView>
        );
    }
}

export default index;