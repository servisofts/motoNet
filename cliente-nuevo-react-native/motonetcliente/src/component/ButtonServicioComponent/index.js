import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg from '../../Svg';

const ButtonServicioComponent = (props) => {
    return (
        <View style={{           
        }}>
            <TouchableOpacity
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign:"center",
                    backgroundColor:"#13386E"
                }}
                onPress={
                    () => {
                        //alert(props.nombre)
                        props.navigation.navigate(props.page);
                    }
                }
            >
                <Svg name = {props.nameSvg}
                    style={{
                        position: "absolute",
                        width: 100,
                        height: 100,
                    }} />
            </TouchableOpacity>

            <View style={{
                alignContent: "center",
                height:35,
                marginTop:5
            }}>
                <Text style={{
                    textAlign: "center",
                    fontStyle:"italic",
                    fontWeight:"500",
                    color:"#2C4C7E"
                }}>
                    {props.nombreServicio}
                </Text>
            </View>

        </View>
    )
}

export default ButtonServicioComponent
