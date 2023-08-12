import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SInput, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';

class chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    renderMessage({ data }) {
        return <SView col={"xs-12"} row>
            <SView width={8} />
            <SView backgroundColor={"#202C34"} style={{
                paddingTop: 8,
                paddingBottom: 16,
                paddingLeft: 14,
                paddingRight: 40,
                borderRadius: 8,
            }}>
                <SText color={"#fff"} fontSize={16} font={"Roboto"}>{data}</SText>
                <SText fontSize={12} font={"Roboto"} color={"#fff"} style={{ position: "absolute", bottom: 2, right: 2, }}>{"12:01"}</SText>
            </SView>
        </SView>
    }

    renderHeader() {
        return <SView height={50} col={"xs-12"} style={{ position: "absolute", top: 0, backgroundColor: STheme.color.primary, }} row center>
            <SText color={"#fff"} bold>Central de consultas Tapeke.</SText>
        </SView>
    }
    renderChat() {
        const test = [
            { data: "hola" },
            { data: "como etas?" },
            { data: "tanto tiempo" },
        ]
        return <SView col={"xs-12"} height>
            <SScrollView2 disableHorizontal>
                <SHr height={50} />
                <SList
                    initSpace={8}
                    data={test}
                    render={this.renderMessage}
                />
            </SScrollView2>
        </SView>
    }
    renderInput() {
        return <SView card height={50} col={"xs-12"} row
            style={{ position: "absolute", bottom: 0, paddingTop: 8, paddingBottom: 8, backgroundColor: STheme.color.primary }}>
            <SView width={50} height>

            </SView>
            <SView flex row height>
                <SInput type={"text"} customStyle={"clean"} style={{
                    color: "#000",
                    backgroundColor: STheme.color.secondary,
                    borderRadius: 100,
                    paddingLeft: 8
                }}
                    placeholder={"Message"}
                    value={this.state.text}
                    onChangeText={(text) => {
                        this.setState({ text: text })
                    }}
                />
            </SView>
            <SView width={50} height center onPress={() => {

            }}>
                {!this.state.text ? null : <SText color={STheme.color.secondary} bold>Send</SText>}
            </SView>
        </SView>
    }
    render() {
        return (<SPage disableScroll >
            {this.renderChat()}
            {this.renderHeader()}
            {this.renderInput()}
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(chat);