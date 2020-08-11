import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform,  Image, TextInput, TouchableOpacity, Linking, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import Carga from '../../Component/Carga';


class CargaPage extends Component {
  static navigationOptions = ({ navigation }) => (
    navigation.state.prop ? ({ ...navigation.state.prop }) : {}
  );

  constructor(props) {
    super(props);
    props.state.navigationReducer.setParams(props.navigation, {
      title: "Carga",
      headerShown: false,
      headerTitleStyle: {
        color: '#fff',
      },
    })
  }

  componentDidMount() { // B
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = (event) => { // D
    this.navigate(event.url);
  }
  navigate = (url) => { // E
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];

    if (routeName === 'glup') {
      this.props.navigation.navigate('Perfil', { id, name: 'chris' })
    };
  }
  render() {
    return (
      <Carga  />
    );
  }
}





const initStates = (state) => {
  return { state }
};

export default connect(initStates)(CargaPage);