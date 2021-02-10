import React, { Component } from 'react'
import { View, Text } from 'react-native';
import NuevoPass from '../../Component/NuevoPass';

class NuevoPassPage extends Component {

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <NuevoPass navigation={this.props.navigation} />
            </View>
        )
    }
}

export default NuevoPassPage;
