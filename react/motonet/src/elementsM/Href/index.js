import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Button} from 'react-native';
import {Link} from "@react-navigation/web";

const isWeb = Platform.OS === 'web';

export default class Href extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.change=()=>{
        switch(this.props.metod){
            case "replace":
                this.props.proper.navigation.replace(this.props.url)
                return;
            case "push":
                this.props.proper.navigation.push(this.props.url)
                return;
        }
    }
  }

  render() {
    return (
      <View style={styles.container}>
       {
                !isWeb ? <Button
                    title={this.props.title}
                    onPress={this.change }
            />:  <Link routeName={this.props.url}>{this.props.title}</Link>
                    
            }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor:"transparent",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  }
})