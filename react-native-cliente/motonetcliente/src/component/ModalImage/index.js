import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Animated, TouchableWithoutFeedback, ActivityIndicator, Dimensions } from 'react-native';
import Svg from '../../Svg';
import ImageViewer from 'react-native-image-zoom-viewer';
// import styles from './styles'

class RecuperarPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: false,
        };
    }

    // Llamada al webservice para reperar contrasena
    callRecuperarPass() {
        // alert('contrasena recuperada...');
        this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
            component: "usuario",
            type: "recuperarPass",
            estado: "cargando",
            data: this.state.email,
        }, true);
    }

    // Boton Cerrar
    btnCerrar() {
        this.props.callbackAfterCloseModal(0, this.props.otherParamsToSend);
    }

    render() {
        const images = [{
            url: this.props.fotoUriAux
        }]
        return (
            // <TouchableWithoutFeedback
            //     onPress={() => {
            //         // this.props.callbackAfterRecuperarPass(0, this.props.otherParamsToSend);
            //         console.log("sds")
            //     }}>
            //     <View style={styles.container} >

            //         <TouchableWithoutFeedback
            //             onPress={(evt) => {
            //                 console.log("ss")

            //             }}>
            //             <>
            //                 <View style={styles.btnClose}>
            //                     <TouchableOpacity
            //                         onPress={() => this.btnCerrar()}>
            //                         <Svg name="Close"
            //                             style={{
            //                                 width: 25,
            //                                 height: 25,
            //                                 fill: "#fff",
            //                             }} />
            //                     </TouchableOpacity>
            //                 </View>


            //                 <View style={{
            //                     flex: 1,
            //                     justifyContent: "center",
            //                     alignItems: "center",
            //                     // backgroundColor: "#ccc"
            //                 }}>

            //                     <Image source={{ uri: this.props.fotoUriAux }}
            //                         style={{
            //                             resizeMode: "center",
            //                             width: "100%",
            //                             height: "100%",
            //                             borderRadius: 10,
            //                         }} />

            //                     {/* <ImageViewer imageUrls={images} /> */}
            //                 </View>
            //             </>

            //         </TouchableWithoutFeedback >

            //     </View >

            // </TouchableWithoutFeedback >
            <>
                <ImageViewer
                    onCancel={() => {
                        console.log("ss")
                    }}
                    imageUrls={images}
                    onSwipeDown={() => {
                        this.btnCerrar()
                    }}
                    renderIndicator={() => null}
                />

                <View style={styles.btnClose}>
                    <TouchableOpacity
                        style={{ padding: 15 }}
                        onPress={() => this.btnCerrar()}>
                        <Svg name="Close"
                            style={{
                                width: 20,
                                height: 20,
                                fill: "#fff",
                            }} />
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 15,
        // justifyContent: 'center',
        backgroundColor: '#000'

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

export default connect(initStates)(RecuperarPass);
