import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Linking, Animated, AsyncStorage, Dimensions } from 'react-native';
import Carga from '../../Component/Carga';
import Svg from '../../Svg';
import ImgFondoCruces from '../../Component/ImgFondoCruces';
import Styles from '../../Styles';
import STheme from "../../STheme";
class CargaPage extends Component {
  static navigationOptions = ({ navigation }) => (
    { headerShown: false }
  );
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
      { iterations: 3000 },
    ).start();
  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        // backgroundColor: "white",
        backgroundColor: Styles.colors.primary,
        justifyContent: 'center',
      }}>
        <Animated.View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%"
            },
            // {
            //   transform: [
            //     {
            //       scale: this.state.startValue,
            //     },
            //   ],
            // },
          ]}
        >
          <Svg name="logoCompleto"
            style={{
              width: Dimensions.get("window").width * 0.6,
              height: Dimensions.get("window").width * 0.6,
              fill: STheme.color.primary,
            }} />
        </Animated.View>
        <Carga navigation={this.props.navigation} />
      </View>

    );
  }
}


export default CargaPage;

