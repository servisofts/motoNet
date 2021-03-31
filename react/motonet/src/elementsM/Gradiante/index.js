import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Button} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const isWeb = Platform.OS === 'web';

export default class Gradiante extends Component {
  constructor(props) {
    super(props);
    
    
  }

  render() {
    if(isWeb){
      return (
      
        <LinearGradient colors={['#482262', '#7c3d7f']} style={styles.linearGradient}>
        
        </LinearGradient>

      
    );
    }else{
      return (
      
        <LinearGradient colors={['#482262', '#7c3d7f']} style={styles.linearGradient}>
        
        </LinearGradient>

      
    );
    }
  
  }
}

var styles = StyleSheet.create({
  linearGradient: {
      height:"100%",
      width:"100%",
      top:0,
      left:0,
      position:"absolute"
    
  },
  
});