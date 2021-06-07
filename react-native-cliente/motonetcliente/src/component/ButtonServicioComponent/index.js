import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import Svg from '../../Svg';
import STheme from '../../STheme';

const ButtonServicioComponent = (props) => {
    return (
        <View style={{
            // justifyContent:"center",
            alignItems: "center",
            marginTop: 8,
            width: "100%",

            // width: "100%",
            // padding: 10
        }}>
            <TouchableOpacity
                style={{
                    // width: "50%",
                    // height: "50%",
                    width: "90%",
                    height: 110,
                    backgroundColor: STheme.color.primary,
                    borderBottomWidth: 2,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: STheme.color.textb + "22",
                    borderRadius: 8,
                    justifyContent: "center",
                    padding: 12,
                    // borderColor: "#f00",
                    // borderWidth: 2, 
                    flexDirection: "row",
                }}
                onPress={() => {
                    // alert("dssd")
                    props.navigation.navigate(props.page);
                }}>
                <View style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: "center"
                }}>
                    <Text style={{
                        color: STheme.color.textb,
                        fontSize: 22,
                        fontWeight: "bold"
                    }}>
                        {props.nombreServicio}
                    </Text>
                    <Text style={{
                        color: STheme.color.textb,
                        fontSize: 14,
                    }}>
                        {props.detalle}
                    </Text>
                </View>
                <View style={{
                    width: 100,
                }}>
                    <Svg name={props.nameSvg} />
                </View>
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
