/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import Svg from './src/Svg'

///reducx
import { createStore, applyMiddleware } from 'redux';
import Reducer from './src/Reducer';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
//

//IMPORTS DEL NAVIGATION
import { CardStyleInterpolators, createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import * as Pages from './src/pages';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen'

//--FIN--

// import * as socketCliente from './src/socketCliente'
import * as ReintentPetition from './src/ReintentPetition'
import NaviDrawer from './src/component/NaviDrawer'
import { version } from 'react';
import SSPushNotification from './src/SSPushNotification';
import * as UploadFile from './src/UploadFIle';
import AppStateChange from './src/AppStateChange';

import * as HttpConection from './src/HttpConection'
import * as SSSocketNative from './src/SSSocketNative'
import BarraDeDesconeccion from './src/SSSocketNative/BarraDeDesconeccion';
import AlertaDesconectado from './src/SSSocketNative/AlertaDesconectado';
import STheme from './src/STheme';
import SPopup from './src/SPopup';


const store = createStore(
  Reducer,
  {},
  applyMiddleware(reduxThunk),
);

SSPushNotification(store);
SSSocketNative.init(store);
HttpConection.init(store);

//SERVICIOS 



const Home = createStackNavigator(
  Pages.getPages(),
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerBackground: () =>
        <LinearGradient colors={["#799cb3", "#547a9e"]} style={{
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          // backgroundColor: "#000",
          position: "absolute"
        }}>
        </LinearGradient>
      ,
      // title: '',
      headerTitleContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
      },
      headerTitleStyle: {
        showLabel: false,
        color: "#fff",
      },
      cardStyle: {
        backgroundColor: STheme.color.background
      },
      headerTintColor: "#fff",

      headerTitle: () => (
        getTitleCenter(navigation)
      ),
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }),
  }
);
const defaultGetStateForAction = Home.router.getStateForAction;
Home.router.getStateForAction = (action, state) => {
  if (state && action.type === 'GoToRoute') {
    let index = state.routes.findIndex((item) => {
      return item.routeName === action.routeName
    });
    const routes = state.routes.slice(0, index + 1);
    return {
      routes,
      index
    };
  }
  return defaultGetStateForAction(action, state);
};
const getTitleCenter = (navigation) => {
  return (
    <View />
  )
}

const Container = createAppContainer(Home);

class App extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    // TcpSocket.initSocket(store);
    SplashScreen.hide();
    UploadFile.setStore(store);
    // ReintentPetition.initStore(store);
    SSSocketNative.init(store);
    HttpConection.init(store);

  }
  render() {
    return (
      <Provider store={store}>
        {/* <AppStateChange store={store} /> */}
        <SafeAreaView style={{ flex: 1, backgroundColor: STheme.color.background }}>
          <StatusBar barStyle={"light-content"} backgroundColor={STheme.color.background} />
          <BarraDeDesconeccion socketName={"motonet"} color={STheme.color.backgroundColor} />
          <Container />
          <SPopup />
          {/* <NaviDrawer /> */}
        </SafeAreaView>
      </Provider>
    );
  }
};

export default App;
