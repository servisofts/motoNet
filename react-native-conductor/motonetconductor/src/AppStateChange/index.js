import React, { Component } from 'react'
import { AppState, View } from 'react-native'
import AppParam from '../Json/index.json'
import * as SSSocketNative from '../SSSocketNative';
const delay = ms => new Promise(res => setTimeout(res, ms));

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    }

  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      SSSocketNative.getSession(AppParam.socket.name).ping();
    } else {
      console.log('App has come to the background!')
    }
    this.setState({ appState: nextAppState });
  }
  render() {
    return (
      <View />
    );
  }

}