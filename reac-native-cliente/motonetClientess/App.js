/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';
import {
  View, SafeAreaView,
} from 'react-native';


///reducx
import { createStore, applyMiddleware } from 'redux';
import Reducer from './src/reducers';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
//

//IMPORTS DEL NAVIGATION
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import * as Pages from './src/pages';
//--FIN--


const store = createStore(
  Reducer,
  {},
  applyMiddleware(reduxThunk),
);


const Home = createStackNavigator(
  Pages.getPages(),
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // headerBackground: () =>
      //   <LinearGradient colors={Theme.gradient.primary} style={{
      //     height: "100%",
      //     width: "100%",
      //     top: 0,
      //     left: 0,
      //     backgroundColor: "#000",
      //     position: "absolute"
      //   }}>

      //   </LinearGradient>
      // ,
      // headerTitleStyle: {
      //   color: Theme.colors.secondary,
      // },
      // headerRight: () => (
      //   <View />
      // )
    }),
  }
);
const Container = createAppContainer(Home);

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{flex:1}}>
          <Container />
        </SafeAreaView>
        </Provider>
    );
  }
};

export default App;
