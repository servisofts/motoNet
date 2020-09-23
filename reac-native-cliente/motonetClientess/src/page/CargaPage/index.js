import React, { Component } from 'react'
import {View } from 'react-native'
import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';


class CargaPage extends Component {
  static navigationOptions = ({ navigation }) => (
    navigation.state.prop ? ({ ...navigation.state.prop }) : {}
  );

  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(1),
      endValue: 1.3,
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

  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

      }}>
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
    width: 300,
  },
});

const initStates = (state) => {
  return { state }
};

export default connect(initStates)(CargaPage);