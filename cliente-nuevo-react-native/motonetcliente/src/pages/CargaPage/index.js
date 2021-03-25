import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import Carga from '../../component/Carga';
import Svg from '../../Svg';

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
      { iterations: 4000 },
    ).start();
  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red",
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

          <Svg name="Logo"
            style={{
              width: 200,
              height: 200,
            }} />
          <Text style={
            {
              marginTop: 10,
              fontSize: 30,
              fontWeight: "bold",
              color: "#fff"
            }}>MotoNet</Text>

        </Animated.View>
        <Carga navigation={this.props.navigation} />
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
});

const initStates = (state) => {
  return { state }
};

export default connect(initStates)(CargaPage);