import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Linking, Animated, AsyncStorage } from 'react-native';
import Carga from '../../Component/Carga';
import Svg from '../../Svg';
import ImgFondoCruces from '../../Component/ImgFondoCruces';
class CargaPage extends Component {
  static navigationOptions = ({ navigation }) => (
    { headerShown: false }
  );
  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(1),
      endValue: 1.5,
    };

  }

  componentDidMount() { // B
    Animated.loop(
      Animated.spring(this.state.startValue, {
        toValue: this.state.endValue,
        friction: 1,
        useNativeDriver: true,
      }),
      { iterations: 3000 },
    ).start();
  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white",
        justifyContent: 'center',
      }}>

        <ImgFondoCruces />
        <Animated.View
          style={[
            {
              marginTop: 100,
              width: 200,
            },
            {
              transform: [
                {
                  scale: this.state.startValue,
                },
              ],
            },
          ]}
        >
          <Svg name="logoCompletoRecurso"
            style={{
              width: 200,
              height: 200,

            }} />
        </Animated.View>
        <Carga navigation={this.props.navigation} />
      </View>

    );
  }
}


export default CargaPage;

