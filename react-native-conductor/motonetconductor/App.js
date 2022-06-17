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
  TouchableOpacity,
  AppState
} from 'react-native';
//NAVIGATIONr
import { CardStyleInterpolators, createStackNavigator } from 'react-navigation-stack';
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

import LinearGradient from 'react-native-linear-gradient';

import NaviDrawer from './src/Component/NaviDrawer';

import SSPushNotification from './src/SSPushNotification';

//IMPORT SSSocketNative
import * as SSSocketNative from './src/SSSocketNative';
import BarraDeDesconeccion from './src/SSSocketNative/BarraDeDesconeccion';
import AlertaDesconectado from './src/SSSocketNative/AlertaDesconectado';

// import * as socketCliente from './src/socketCliente'
import * as HttpConection from './src/HttpConection'
import DisconectBarra from './src/Component/DisconectBarra';
import AppStateChange from './src/AppStateChange';
// import * as BackgroundLocation from './src/BackgroundLocation'
// import * as SSBackgroundLocation from './src/SSBackgroundLocation';
import { SBLocation } from 'servisofts-background-location';

import Styles from './src/Styles';
import SPopup from './src/SPopup';
import { SComponentClass } from './src/SComponent';

const store = createStore(
  Reducer,
  {},
  applyMiddleware(reduxThunk),
);
//SERVICIOS 
// socketCliente.initSocket(store);

const onLocationChange = (action) => {
  if (action?.type == "locationChange") {
    action.data.deegre = action.data.rotation;
    var locationToServer = {
      component: "backgroundLocation",
      type: "registro",
      key_usuario: store.getState().usuarioReducer?.usuarioLog?.key,
      data: action.data,
      id: "httpSession",
    };
    HttpConection.send(locationToServer, false);
    console.log(locationToServer)
  }
  return true;
}

SBLocation.initEmitter(onLocationChange)

HttpConection.init(store);
SSSocketNative.init(store);
// BackgroundLocation.init(store);
// SSBackgroundLocation.init(store);

SSPushNotification(store)




const Home = createStackNavigator(
  Pages.getPages(),
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerBackground: () =>
        <LinearGradient colors={Styles.gradient.primary} style={{
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
        color: Styles.colors.secondary,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      // headerRight: () => (
      //   <View />
      // ),
      // headerLeft: () => goBackButton(navigation),
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
  componentDidMount() {
    console.log("ENTRO COMPONENT DID MOUNT")
    // BackgroundLocation.init(store);
    HttpConection.init(store);
    // SSBackgroundLocation.init(store);
    SSSocketNative.init(store);

  }
  getContenido() {
    var contenido = <View />
    try {
      contenido = <Container />;
    } catch (error) {
      // SSBackgroundLocation.getInstance().stop();
    }
    return contenido;
  }
  render() {
    return (
      <Provider store={store}>
        <AppStateChange store={store} />

        <SafeAreaView style={{ backgroundColor: Styles.colors.primary }}>
          <StatusBar barStyle={Styles.barStyle} backgroundColor={Styles.colors.primary} />

          <View style={{
            width: "100%",
            height: "100%"
          }}>
            <BarraDeDesconeccion socketName={"motonet"} />
            <AlertaDesconectado socketName={"motonet"} />
            <SComponentClass>
              {this.getContenido()}
            </SComponentClass>
            <SPopup />
          </View>

        </SafeAreaView>
      </Provider>

    );
  }

};


export default App;


