import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { ThemeColors } from 'react-navigation';
import RecuperarPass from '../../Component/RecuperarPass';
import Theme from '../../Styles/Theme.json'

class RecuperarPassPage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: Theme.colors.fondo
            }}>
                <RecuperarPass navigation={this.props.navigation} />
            </View>
        )
    }
}

export default RecuperarPassPage;
