import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import Svg from '../../Svg';
import Styles from '../../Styles';

const ButtonServicioComponent = (props) => {
    return (
        <View style={{
            // justifyContent:"center",
            alignItems: "center",
            marginTop: Dimensions.get('window').width * 0.02,

            // backgroundColosr: "#ccc",
            // width: "100%",
            // padding: 10
        }}>
            <TouchableOpacity
                style={{
                    // width: "50%",
                    'width': Dimensions.get('window').width * 0.7,
                    // height: "50%",
                    height: 90,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderColor: "#f00",
                    borderWidth: 2,
                    ...Styles.sombra
                }}
                onPress={() => {
                    // alert("dssd")
                    props.navigation.navigate(props.page);
                }}>
                <Text style={{
                    color: "#f00"
                }}>
                    {props.nombreServicio}
                </Text>
                {/* <Svg name={props.nameSvg}
                    style={{
                        position: "absolute",
                        width: Dimensions.get('window').width * 0.12,
                        height: Dimensions.get('window').width * 0.12,
                        fill:"#fff"
                        // 'height': Dimensions.get('window').height * 0.25,

                    }} /> */}
            </TouchableOpacity>

            {/* <View style={{
                alignContent: "center",
                // height: 35,
                marginTop: Dimensions.get('window').width * 0.01
            }}>
                <Text style={{
                    textAlign: "center",
                    // fontStyle: "italic",
                    fontWeight: "500",
                    fontSize: Dimensions.get('window').width * 0.03,
                    color: "#2C4C7E"
                }}>
                    {props.nombreServicio}
                </Text>
            </View> */}

        </View>
    )
}

export default ButtonServicioComponent
