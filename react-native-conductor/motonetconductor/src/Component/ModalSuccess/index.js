import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Animated, TouchableWithoutFeedback, ActivityIndicator, Dimensions } from 'react-native';
import Svg from '../../Svg';
//import ImageViewer from 'react-native-image-zoom-viewer';
// import styles from './styles'

class ModalSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: false,
        };
    }
    // Boton Cerrar
    btnCerrar() {
        this.props.closeModal();
    }
    render() {
        const images = [{
            url: this.props.fotoUriAux
        }]
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    // this.props.callbackAfterRecuperarPass(0, this.props.otherParamsToSend);
                    this.props.closeModal();
                    console.log("tou")
                }}>
                <View style={styles.container}
                    onPress={() => {
                        console.log("sds")
                    }} >
                    <TouchableWithoutFeedback
                        // disabled={false}
                        // enabled={false}
                        disabled={false}
                        onPress={(evt) => {
                            evt.stopPropagation()
                            console.log("1")
                        }}
                        onTouchStart={() => {
                            // evt.stopPropagation()
                            console.log("2")
                        }}
                        onPressOut={() => {
                            console.log("3")
                        }}
                        pointerEvents="none">
                        <View style={{
                            width: 300,
                            height: 200,
                            backgroundColor: "#fff",
                            borderColor: "#ccc",
                            borderRadius: 10,
                            borderWidth: 1,
                            // position: "absolute",
                        }}>

                            <View style={{
                                flex: 2,
                                // backgroundColor: "#2C4C7E",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>

                                <Svg name={"Success"}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        fill: "#0CAD27"
                                    }} />
                                <Text style={{
                                    // color: "#B7B8BC",
                                    color: "#a4a4a4",
                                    fontSize: 18
                                }}  >
                                     {this.props.mensaje} 
                                    </Text>

                            </View>
                            <View style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        //this.props.replacePage() //NO FUNCA
                                        this.props.closeModal()
                                    }}
                                    style={{
                                        width: "60%",
                                        height: 40,
                                        backgroundColor: "#F7001D",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 10
                                    }}
                                >
                                    <Text style={{
                                        color: "#fff"
                                    }}>
                                        OK
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </TouchableWithoutFeedback >
                </View >
            </TouchableWithoutFeedback >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 15,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#00000050'

    },
    scrollView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    bottomView: {
        borderRadius: 8,
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    topContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    textHeader: {
        color: '#2c4b81',
        fontSize: 18,
        marginVertical: 8,
        alignSelf: 'center'
        // backgroundColor: 'red'
    },
    bottomContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginTop: 5,
        marginBottom: 5
    },
    dividerView: {
        backgroundColor: '#3c3c3c',
        height: 4
    },
    btnCancel: {
        backgroundColor: '#2c4b81',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 10,
        overflow: 'hidden',
        alignSelf: 'center',
        marginBottom: 20,
        width: 180,
        height: 35
    },

    textCancel: {
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 10
    },
    btnClose: {
        // backgroundColor: '#ccc',
        justifyContent: 'flex-end',
        // marginTop: 5,
        // marginRight: 5,
        // padding: 15,
        // width:,
        top: 5,
        left: 5,
        overflow: 'hidden',
        alignSelf: 'flex-start',
        position: "absolute"
        // backgroundColor:"#ccc"
    },
    textClose: {
        color: 'black',
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 10
    },
    inputText: {
        paddingVertical: 5,
        color: 'black',
        marginLeft: 10,
        fontSize: 14,
        textAlign: 'left'
    },
    inputView: {
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'flex-start',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: '#3c3c3c',
        overflow: 'hidden',
    },
});



const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ModalSuccess);
