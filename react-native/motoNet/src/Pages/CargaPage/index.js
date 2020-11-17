import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Linking, Animated,AsyncStorage } from 'react-native';
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
        <Carga navigation={this.props.navigation}/>
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