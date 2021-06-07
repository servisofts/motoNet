import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Dimensions, ActivityIndicator } from 'react-native';
import urlFoto from '../../Json/index.json';
import AppParams from '../../Json'
import CaruselImage from './CaruselImage';

var images = []

class CarouselPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getPublicidad = () => {
        this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "publicidad",
            type: "getAll",
            estado: "cargando"
        }, true);
        return <View />
    }

    render() {

        if (this.props.state.publicidadReducer.estado == "cargando") {
            return (
                <ActivityIndicator size="large" color="#2C4C7E" />
            )
        }

        if (!this.props.state.publicidadReducer.data) {
            this.getPublicidad();
            return <View />
        }

        var data = this.props.state.publicidadReducer.data;

        // console.log("data" + JSON.stringify(data))
        images = [];
        Object.keys(data).map((key) => {
            var url = urlFoto.urlImages + "publicidad.png" + `?type=publicidad&key=${key}`;
            images.push(url)
        })

        return (
            <View>
                < CaruselImage images={images} />
            </View>
        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(CarouselPage);