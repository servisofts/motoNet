import React, { Component } from 'react';
import { View, Platform, Image} from 'react-native';


const isWeb = Platform.OS === 'web';

export default class Img extends Component {
  constructor(props) {
    super(props);
 
    
  }

  render() {
    return (
      <View>
       {
         
          
                !isWeb ?   <Image style={this.props.style} source={this.props.src} />
                :   <img styles={this.props.style} src={this.props.src}/>

            }
      </View>
    );
  }
}
