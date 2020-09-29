import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Linking, Animated } from 'react-native';
import { connect } from 'react-redux';
import Carga from '../../Component/Carga';
import Svg from '../../Svg';


class CargaPage extends Component {
  static navigationOptions = ({ navigation }) => (
    navigation.state.prop ? ({ ...navigation.state.prop }) : {}
  );

  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(1),
      endValue: 1.5,
    };
    props.state.navigationReducer.setParams(props.navigation, {
      title: "Carga",
      headerShown: false,
      headerTitleStyle: {
        color: '#fff',
      },

    })
  }

  componentDidMount() { // B
    Animated.loop(
      Animated.spring(this.state.startValue, {
        toValue: this.state.endValue,
        friction: 1,
        useNativeDriver: true,
      }),
      { iterations: 1000 },
    ).start();

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
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: "red",
        justifyContent: 'center',
      }}>

        <Animated.View
          style={[
            styles.square,
            {
              transform: [
                {
                  scale: this.state.startValue,
                },
              ],
            },
          ]}
        >
          <Svg name="LogoMoto"
            style={{
              width: 200,
              height: 200,

            }} />
        </Animated.View>
        <Carga />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    marginTop: 100,
    width: 200,
  },
});

const initStates = (state) => {
  return { state }
};

export default connect(initStates)(CargaPage);