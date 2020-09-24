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
    if (!props.ischeck) {
        props.ischeck = false;
    }
    if (props.ischeck !== isCheck) {
        props.ischeck = !isCheck;
        setisCheck(props.ischeck);
        return <View />
    }
    if (isCheck) {
        return (
            <TouchableOpacity onPress={hadleClick}>
                <View style={[styles.cbPadreCheck]}>
                    <Svg name="Bien"
                        style={{
                            width: 20,
                            height: 20,
                            fill: "#fff"
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
        width: 25,
        height: 25,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 8,
        marginLeft: 5,

    },
    cbPadreCheck: {

        width: 25,
        height: 25,
        borderColor: "#4d2564",
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: "#4d2564",
        marginLeft: 5,
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
    },
});
export default MiCheckBox;