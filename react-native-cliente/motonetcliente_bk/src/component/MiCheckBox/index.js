import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg from '../../Svg';

const MiCheckBox = (props) => {

    const [isCheck, setisCheck] = React.useState(false);
    const hadleClick = () => {
        if (props.onChange) {
            props.onChange(!isCheck);
        }
        setisCheck(!isCheck);
        return <View />
    }

    if (props.ischeck !== isCheck) {
        setisCheck(props.ischeck);
        return <View />
    }

    if (isCheck) {
        return (
            <TouchableOpacity onPress={hadleClick}>
                <View style={[styles.cbPadreCheck]}>
                    <Svg name="Close"
                        style={{
                            width: 20,
                            height: 20,
                            fill: "#2C4C7E"
                        }} />
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={hadleClick}>
                <View style={styles.cbPadre}>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    cbPadre: {
        width: 35,
        height: 35,
        borderColor: "#2C4C7E",
        backgroundColor: "#fff",
        borderWidth: 2,
        borderRadius: 100,
    },

    cbPadreCheck: {
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#2C4C7E",
        borderWidth: 2,
    },

    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
    },
});
export default MiCheckBox;