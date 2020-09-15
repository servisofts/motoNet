/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
//NAVIGATIONr
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
//PAGES
import * as Pages from './src/Pages';
///reducx
import { createStore, applyMiddleware } from 'redux';
import Reducer from './src/Reducers';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
//
// import * as conection from './src/conection'
import * as Location from './src/Location'

import LinearGradient from 'react-native-linear-gradient';

import Theme from './src/Styles/Theme.json';
import NaviDrawer from './src/Component/NaviDrawer';
const store = createStore(
  Reducer,
  {},
  applyMiddleware(reduxThunk),
);
//CONEXIONES DE SERVIDORES
// conection.initSocket(store, "")
import * as socketCliente from './src/socketCliente'
import DisconectBarra from './src/Component/DisconectBarra';
//SERVICIOS 
Location.init(store); 
//SERVICIOS 
socketCliente.initSocket(store);
const Home = createStackNavigator(
  Pages.getPages(),
  {

    defaultNavigationOptions: ({ navigation }) => ({
      headerBackground: () =>
        <LinearGradient colors={Theme.gradient.primary} style={{
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          backgroundColor: "#000",
          position: "absolute"
        }}>

        </LinearGradient>
      ,
      headerTitleStyle: {
        color: Theme.colors.secondary,
      },
      headerRight: () => (
        <View />
      ),
      headerLeft: () => goBackButton(navigation),
    }),
  }
);


const goBackButton = (navigation) => {
  if (navigation.isFirstRouteInParent()) {
    return <View />
  }
  return (<TouchableOpacity style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }}
    onPress={() => navigation.goBack()}>

  </TouchableOpacity>)
}
const Container = createAppContainer(Home);
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ backgroundColor: Theme.colors.primary }}>
          <StatusBar barStyle={Theme.barStyle} />

          <View style={{
            width: "100%",
            height: "100%"
          }}>
            <DisconectBarra />
            <Container />
            <NaviDrawer />

          </View>

        </SafeAreaView>
      </Provider>

    );
  }

};


export default App;


