import React, { Component } from 'react'
import { View, Text } from 'react-native';
import CodigoRecibido from '../../Component/CodigoRecibido';

class CodigoRecibidoPage extends Component {

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <CodigoRecibido navigation={this.props.navigation} />
            </View>
        )
    }
}

export default CodigoRecibidoPage;
