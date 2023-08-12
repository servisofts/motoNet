import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SList, SLoad, SNavigation, SPage, SText, STheme, SView, SMapView } from 'servisofts-component';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';

class root extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }
    getZona(key_zona) {
        const zonas = Model.zona.Action.getByKey(key_zona);
        if (!zonas) return null;
        var obj = zonas;
        return <SMapView.SCircle
            strokeColor={STheme.color.primary + "44"}
            // strokeOpacity={0.8}
            strokeWidth={2}
            fillColor={STheme.color.primary + "44"}
            // fillOpacity={0.3}
            center={{
                latitude: obj.latitude,
                longitude: obj.longitude
            }}
            radius={obj.radio}

        />

    }


    renderLista() {
        var zonas = Model.zona.Action.getAll();
        if (!zonas) return <SLoad />
        return <SList
            initSpace={15}
            space={15}
            data={zonas}
            render={obj => {
                return <SView col={"xs-12"} card center
                    style={{
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "#dedede"
                    }}>
                    <SView col={"xs-12"} center row>
                        <SView width={50} height={50} style={{
                            padding: 4
                        }}>
                            <SView flex height style={{
                                borderRadius: 8,
                                backgroundColor: STheme.color.primary,

                            }} center>
                                <SText style={{ textTransform: "uppercase" }} bold color={STheme.color.white}>{obj.nombre.substring(0, 1)}</SText>
                            </SView>
                        </SView>
                        <SView width={10}>

                        </SView>
                        <SView flex style={{
                            justifyContent: 'center',
                        }}>
                            <SText fontSize={12} color={STheme.color.lightGray}>Zona </SText>
                            <SText style={{ textTransform: "capitalize" }} fontSize={16}>{obj.nombre}</SText>
                            <SHr />

                        </SView>
                    </SView>
                    <SView col={"xs-12"} height={100}>
                        <SMapView
                            initialRegion={{
                                latitude: obj.latitude,
                                longitude: obj.longitude,
                                latitudeDelta: (obj.radio * 2) * 0.000005,
                                longitudeDelta: (obj.radio * 2) * 0.000005,
                            }}
                            // showsBuildings={false}
                            // showsIndoors={false}
                            // liteMode={true}
                            // showsPointsOfInterest={true}
                            // showsUserLocation={true}
                            // userInterfaceStyle={"dark"}
                            toolbarEnabled={false}

                        >
                            <></>
                            {this.getZona(obj.key)}
                        </SMapView>

                    </SView>
                    <SView col={"xs-12"} height style={{
                        position: "absolute",
                        // backgroundColor:"#f0f"
                    }} onPress={() => {
                        SNavigation.navigate("/zona/profile", { key: obj.key })
                    }}>

                    </SView>
                </SView>
            }}
        />

    }

    render() {
        // var zona = Model.zona.Action.getByKey(this.key);
        // if (!zona) return <SLoad />

        return <SPage title={"Zonas"} onRefresh={() => {
            Model.zona.Action.CLEAR();
        }}
            header={<Header />}>
            <Container>
                {this.renderLista()}
            </Container>
        </SPage>
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);