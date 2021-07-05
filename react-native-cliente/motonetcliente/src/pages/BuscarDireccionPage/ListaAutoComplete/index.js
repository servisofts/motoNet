import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import ListaAutoCompleteItem from './ListaAutoCompleteItem';
import ListaSelectPorMapa from './ListaSelectPorMapa';

class ListaAutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista = () => {
        var lista = this.props.state.locationGoogleReducer.listaBusqueda;
        if (this.props.state.locationGoogleReducer.estado == "cargando" && this.props.state.locationGoogleReducer.type == "autoComplete") return <ActivityIndicator color={"#000"} />
        if (!lista) {
            return <View />
        }
        return lista.map((obj, key) => {
            return <ListaAutoCompleteItem direccion={obj.direccion} placeId={obj.place_id} seleccionar={this.props.seleccionar} {...this.props} />;
        })
    }
    getHistorial = () => {
        AsyncStorage.getItem("historialDirecciones").then((res) => {
            var arr = {};
            try {
                arr = JSON.parse(res);
            } catch (error) {
                arr = true
            }
            if (!arr) arr = {}
            console.log(arr)
            this.setState({ historial: arr })
        });
    }
    getListaHistorial = () => {
        if (!this.state.historial) {
            console.log("pidiendo")
            this.getHistorial();
            return <View />;
        }
        return Object.keys(this.state.historial).map((key) => {
            var obj = this.state.historial[key];
            return <ListaAutoCompleteItem direccion={obj.direccion} latLng={obj} seleccionar={this.props.seleccionar} {...this.props} />;
        })
    }
    render() {

        return (
            <View style={{
                flex: 1,
                backgroundColor: "#fff"
            }}>
                <ScrollView style={{
                    flex: 1,
                }}>
                    <ListaSelectPorMapa changeType={() => { this.props.changeType() }} />
                    {this.getLista()}
                    <Text style={{
                        color:"#000",
                        marginLeft:16,
                        fontWeight:"bold",
                        marginTop:16,
                    }}>Recientes</Text>
                    {this.getListaHistorial()}
                </ScrollView>
                {/* <View style={{
                    height:50,
                    backgroundColor:"#f00"
                }}>

                </View> */}
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ListaAutoComplete);