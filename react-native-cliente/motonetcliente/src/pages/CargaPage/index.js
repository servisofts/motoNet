import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import Carga from '../../component/Carga';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import Svg from '../../Svg';
import Styles from '../../Styles';

class CargaPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(1),
      endValue: 1.3,
    };
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
        backgroundColor: Styles.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* <ImgFondoCruces /> */}

        <Animated.View
          style={[
            {
              // width: 300,
              width: "100%",
              // backgroundColor: "#ccc",
              alignItems: "center"
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
              width: Dimensions.get("window").width * 0.6,
              height: Dimensions.get("window").width * 0.6,
            }} />
        </Animated.View>

        <Carga navigation={this.props.navigation} />

      </View>
    );
  }
}


export default CargaPage;