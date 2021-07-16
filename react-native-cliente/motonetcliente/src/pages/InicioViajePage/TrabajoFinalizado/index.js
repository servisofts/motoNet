import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, BackHandler, Dimensions } from 'react-native';
import { connect } from 'react-redux'
// import MiCheckBox2 from '../../../Component/MiCheckBox2';
import Svg from '../../../Svg';
// import urlFoto from '../../../Json/index.json';
import estilos from '../../../STheme/index'
import STheme from '../../../STheme/index';
// import CloseButtom from '../../../Component/CloseButtom';

const numStars = 5

const TrabajoFinalizado = (props) => {

    const backAction = () => {
        props.close();
        return true;
    };

    // const [obj, setObj] = React.useState({
    //     calificacion: "",
    //     rating: 0
    // });

    // if (!props.ventanaValoracion) {
    //     BackHandler.removeEventListener("hardwareBackPress", backAction);
    //     return <View />
    // }
    // BackHandler.addEventListener("hardwareBackPress", backAction);

    const rate = star => {
        props.obj.rating.value = star
        props.setObj({ ...props.obj });
        return <View />
    }

    // const handleChange = (event, id) => {
    //     obj[id] = {
    //         calificacion: event,
    //     }
    //     setObj({ ...obj })
    //     return <View />
    // };

    let start = [];
    for (let x = 1; x <= numStars; x++) {
        start.push(
            <TouchableOpacity
                key={x}
                onPress={() => {
                    rate(x);
                }}
            >
                <Star filled={x <= props.obj.rating.value ? true : false} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: "#ccc"
        }}>
            <View style={{
                flexDirection: 'row',
                // backgroundColor: "#000",
                justifyContenst: "center",
                alignItems: "center",
            }}>
                {start}
            </View>

        </View>
    )
}

class Star extends React.Component {
    render() {
        return (
            <View>
                {this.props.filled ? (
                    <Svg name="Star"
                        style={{
                            width: 20,
                            height: 20,
                            fill: STheme.color.background,
                            marginLeft: 15,
                            marginRight: 15
                        }} />
                ) : (
                    <Svg name="Staron"
                        style={{
                            width: 20,
                            height: 20,
                            fill: STheme.color.background,
                            // margin: 15
                            marginLeft: 15,
                            marginRight: 15
                        }} />
                )}
            </View>
        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(TrabajoFinalizado);

