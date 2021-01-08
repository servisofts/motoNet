import React, { useRef } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import {ScrollView} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const PerfilConductorPage = (props) => {

    const alignment = useRef(new Animated.Value(0)).current;

    const bringUpActionSheet = () => {
        Animated.timing(alignment, {
            toValue: 1,
            duration: 500,           
        }).start();
    }

    const hideTheActionSheet = () => {
        Animated.timing(alignment, {
            toValue: 0,
            duration: 500
        }).start();
    }

    const actionSheetIntropolate = alignment.interpolate({
        inputRange: [0, 1],        
        outputRange: [-height / 2.4 + 50, 0]
    });

    const actionSheetStyle = {
        bottom: actionSheetIntropolate
    };

    const gestureHandler = (e) => {
        
        if (e.nativeEvent.contentOffset.y > 0) bringUpActionSheet();
        else if (e.nativeEvent.contentOffset.y < 0) hideTheActionSheet();
    };

    return (
        <Animated.View style={[styles.container, actionSheetStyle]}>
            <View>
                <ScrollView                
                    onScroll={(e) => gestureHandler(e)}
                    style={styles.grabber}>
                </ScrollView>
            </View>
        </Animated.View >
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: height / 2.4,
        width: width / 1.05,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginHorizontal: 10,
        backgroundColor: "#ccc",
    },
    grabber: {
        width: 60,
        borderTopWidth: 5,
        borderTopColor: "red",
        alignSelf: "center",
        marginTop: 10,
        height:100,
    }
});

export default PerfilConductorPage;