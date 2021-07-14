import React, { Component } from 'react';
import { connect } from 'react-redux'
import urlFoto from '../../Json/index.json';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Animated, Keyboard, Platform, Image } from 'react-native';
import moment from 'moment';
import Svg from '../../Svg';
import AppParams from "../../Json"
import STheme from '../../STheme';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
var scroll;

class ChatPage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            animValue: new Animated.Value(0),
            inputValue: "",
            keyboardHeight: 3,
        };
        // KeyboardEvent.
    }


    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
            console.log("Enrooooo");
            if (Platform.OS == "ios") {
                this.state.keyboardHeight = e.endCoordinates.height * 0.82;
            } else {
                this.state.keyboardHeight = 2;
            }

            console.log(this.state.keyboardHeight)
            this.setState({ ...this.state })
            this.fadeIn();
        });
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            this.fadeOut();
        });
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        if (!this.state.keyboardHeight) {
            return;
        }
        Animated.timing(this.state.animValue, {
            toValue: 100,
            duration: 350
        }).start();
    }

    fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(this.state.animValue, {
            toValue: 0,
            duration: 150
        }).start();
    }


    render() {
        var getVistoItem = (chat, styleVisto) => {
            var style = {
                color: "#A5A5A5",
                fontSize: 9,
                marginLeft: "2%",
                marginRight: "2%",
                textAlign: "right",
                ...styleVisto
            }
            console.log(chat)
            var hora = moment(chat.fecha_on, "YYYY-MM-DD hh:mm:ss").format("h:mm a");
            if (hora == " Invalid date") {
                hora = moment(new Date(chat.fecha_on), "YYYY-MM-DD hh:mm:ss").format("h:mm a");
            }
            return (
                <Text style={style}>{hora}</Text>
            )
        }

        var getListaMensajes = () => {

            var mensajes = this.props.state.mensajeReducer.data[this.props.state.viajesReducer.data.key];

            if (!mensajes) {
                if (this.props.state.mensajeReducer.estado == "cargando") {
                    return <Text>Cargandooo...</Text>
                }
                this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                    component: "mensaje",
                    type: "getAllByViaje",
                    key_viaje: this.props.state.viajesReducer.data.key,
                    estado: "cargando",
                }, true);
                return <View />
            }
            return Object.keys(mensajes).map((key) => {
                var chat = mensajes[key];

                var style = {
                    borderRadius: 8,
                    minHeight: 20,
                    padding: 8,
                    color: "#fff",
                    maxWidth: "70%",
                    flexDirection: "row",
                }
                var styleVisto = {
                    textAlign: "center"
                }
                var isEmisor = false;
                if (chat.key_emisor != this.props.state.usuarioReducer.usuarioLog.key) {
                    style.marginLeft = "1%"
                    style.backgroundColor = "#E1E1E1";
                    styleVisto.textAlign = "left";
                } else {
                    isEmisor = true
                    style.marginRight = "1%"
                    // style.right=1;
                    style.backgroundColor = STheme.color.background;
                    styleVisto.textAlign = "right";
                }
                return (
                    <View style={{
                        padding: 4,
                        width: "100%",

                        alignItems: (!isEmisor ? "flex-start" : "flex-end")
                    }}>
                        <View key={key}
                            style={style}>
                            <Text style={{ color: "#fff", fontSize: 12, color: (!isEmisor ? "#808080" : "#fff") }}>{chat.mensaje}</Text>
                        </View>
                        {getVistoItem(chat, styleVisto)}
                    </View>
                )
            })
        }

        return (
            <View style={{
                // position: "absolute",
                flex: 1,
                // width: "100%",
                // backgroundColor:"#fff",
                // height: "100%",
                // padding: 20,
                justifyContent: "flex-end",
                // alignItems: "center"
            }}>
                <Animated.View style={{
                    // top: this.state.animValue.interpolate({
                    // inputRange: [0, 100],
                    // outputRange: [0, Dimensions.get("window").height/8*-2]
                    // }),
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    // padding:20,
                    // top: 0,
                    // overflow:"hidden",
                    transform: [
                        {
                            translateY: this.state.animValue.interpolate({
                                inputRange: [0, 100],
                                outputRange: [0, (this.state.keyboardHeight) * -1]
                            }),
                        }
                    ],
                    // minHeight: this.state.animValue.interpolate({
                    //     inputRange: [0, 100],
                    //     outputRange: [0, Dimensions.get("window").height * 0.40]
                    // }),
                    backgroundColor: "#f2f2f2",
                    // borderRadius: 20,
                }}>
                    {/* <View style={{
                width: "90%",
                height: "100%",
                backgroundColor: "#F2F1F2",
                borderRadius: 20,
            }}> */}

                    <ScrollView
                        ref={(ref) => {
                            this.state.scrollView = ref;
                        }}
                        style={{
                            width: "100%",
                        }}
                        onContentSizeChange={() => {
                            this.state.scrollView.scrollToEnd({ amimated: true });
                        }}
                        contentContainerStyle={{
                            flexDirection: "column-reverse",
                            paddingBottom: 70,
                            minHeight: "100%",
                        }}>
                        <TouchableOpacity activeOpacity={1}
                            style={{
                                width: "100%",
                                height: "100%",
                                justifyContent: "flex-end",
                                overflow: "hidden"
                            }}>
                            {getListaMensajes()}
                        </TouchableOpacity>

                    </ScrollView>

                    <View style={{
                        // top: -45,
                        // left: -5,
                        position: "absolute",
                        width: 70,
                        height: 70,
                        backgroundColor: "#dedede",
                        borderRadius: 100,
                        borderColor: "#fff",
                        borderWidth: 3,
                    }}>
                        {/* foto */}
                        <Image style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 100,
                        }} source={{
                            uri: urlFoto.urlImages + `perfil.png?type=getPerfil&key_usuario=${this.props.receptor}`
                        }} />
                    </View>
                    {/* </View> */}
                </Animated.View>
                <Animated.View style={{
                    width: "100%",
                    // backgroundColor: "#efefef",
                    height: 50,
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginBottom: 8,
                    bottom: 0,
                    transform: [
                        {
                            translateY: this.state.animValue.interpolate({
                                inputRange: [0, 100],
                                outputRange: [0, this.state.keyboardHeight * -1]
                            }),
                        }
                    ],
                    // borderRadius: 20,
                }}>

                    <View style={{
                        flex: 1,
                        width: "100%",
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: "#B3B3B3",
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}>
                        <TextInput
                            ref={(ref) => {
                                this.state.refMensaje = ref;
                            }}
                            onChangeText={(text) => {
                                this.state.inputValue = text;
                            }}
                            style={{
                                height: "100%",
                                flex: 1,
                                fontSize: 14,
                            }}
                            onFocus={() => {
                                this.fadeIn();
                            }}
                            onBlur={() => {
                                this.fadeOut();
                            }}
                            multiline={true}
                            placeholderTextColor="#CCCCCC"
                            autoCapitalize='none'
                            placeholder="Escriba su texto..."
                        />

                        <TouchableOpacity
                            onPress={() => {

                                var exito = true
                                if (!this.state.inputValue) {
                                    exito = false
                                }
                                if (exito) {
                                    this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                                        component: "mensaje",
                                        type: "enviar",
                                        estado: "cargando",
                                        data: {
                                            key: uuidv4(),
                                            key_receptor: this.props.state.viajesReducer.data.key_conductor,
                                            key_emisor: this.props.state.usuarioReducer.usuarioLog.key,
                                            mensaje: this.state.inputValue,
                                            key_viaje: this.props.state.viajesReducer.data.key,
                                            fecha_envio: moment().format("YYYY-MM-DD HH:mm:ss")
                                        }
                                    }, true);
                                    this.state.refMensaje.clear();
                                    this.state.inputValue = "";
                                }
                            }}
                            style={{
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Svg name="Send"
                                style={{
                                    width: 30,
                                    height: 30,
                                    fill: "#a4a4a4"
                                }} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

            </View>
        );
    }
}


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ChatPage);
