import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import PButtom from '../../Components/PButtom';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';

class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    item({ url, label }) {
        return <SView col={"xs-12"} center backgroundColor={STheme.color.card} style={{ borderRadius: 16, borderLeftWidth: 20, borderColor: STheme.color.primary }} onPress={() => {
            SNavigation.navigate(url)
        }}>
            <SHr height={20} />
            <SView col={"xs-12"} row center >
                <SView col={"xs-11"} row >
                    <SView width={20}></SView>
                    <SText color={STheme.color.text} fontSize={16}>{label}</SText>
                </SView>
                <SView col={"xs-1"}  >
                    <SIcon name={'AyudaFlecha'} height={20} width={15} fill={STheme.color.card} />
                </SView>
            </SView>
            <SHr height={20} />
        </SView>
    }

    render() {
        return (<SPage title={"Soporte"}
        onRefresh={(resolve)=>{
            
        }}
        header={<Header/>}
        >
            <Container>
            <SHr height={35} />
                    {this.item({
                        url: "/condiciones",
                        label: "Términos y condiciones"
                    })}
                   
                    <SHr height={15} />
                    {this.item({
                        url: "/chat",
                        label: "Chat"
                    })}
                    <SHr height={40} />
                {/* <PButtom onPress={()=>{
                    SNavigation.navigate("/soporte/chat")
                }}>CONTÁCTANOS</PButtom> */}
            </Container>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);