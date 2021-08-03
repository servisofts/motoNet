import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../Components/Page';
import { SIcon, SView } from '../../SComponent';
import BotonesPaginas from '../../SComponent/BotonesPaginas';

export default class AjustesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Page
                history={this.props.history}
                title={"Ajustes"}
                onBack={"goBack"}
                icon={<SIcon name={"ajustes"} />}
            >
                <SView props={{
                    col: "xs-12",
                    variant: "center"
                }}>
                    <BotonesPaginas
                        history={this.props.history}
                        data={[
                            { url: "/", label: "Salir", icon: "salir-png" },
                        ]}
                        onPress={() => {
                            //AsyncStorage.removeItem(AppParams.storage.urlLog);
                            this.props.state.usuarioReducer.usuarioLog = false;
                            this.props.state.usuarioReducer.usuarioDatos = false;
                            this.props.state.usuarioReducer.cargaLoaded = false;
                            //this.props.navigation.replace("CargaPage");
                            this.props.history.push("CargaPage");
                            return <View />;
                          }}
                    />
                </SView>
            </Page>
        );
    }
}
