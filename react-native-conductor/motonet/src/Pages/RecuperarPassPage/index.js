import React, { Component } from 'react'
import { View, Text } from 'react-native';
import RecuperarPass from '../../Component/RecuperarPass';

class RecuperarPassPage extends Component {

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <RecuperarPass navigation={this.props.navigation} />
            </View>
        )
    }
}

export default RecuperarPassPage;
