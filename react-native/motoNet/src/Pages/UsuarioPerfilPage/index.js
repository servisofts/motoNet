import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    ScrollView,
    StyleSheet
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class UsuarioPerfilPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            fotoPerfilUri: false
        }
    }
    pickPhoto = () => {
        ImagePicker.showImagePicker((response) => {
            const source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.state.fotoPerfilUri = source
            this.setState(this.state);
        });
        return <View />
    }
    render() {
        return (
            <View style={{
                flex: 1,
                width: "100%",
                justifyContent: 'center',
            }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        onPress={this.pickPhoto}
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 100,
                            backgroundColor: "red",
                        }}>
                        {!this.state.fotoPerfilUri ? (
                            <View />
                        ) : (
                                <Image source={this.state.fotoPerfilUri}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 100,
                                    }} />

                            )

                        }
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 2, backgroundColor: '#fff', }}>

                </View>



            </View>


        );
    }
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: 350,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableOpacity: {
        width: 200,
        height: 50,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableOpacity2: {
        width: 200,
        height: 50,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },
    touchableOpacity3: {
        width: 200,
        height: 50,
        borderRadius: 20,
        backgroundColor: "#424242",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    },
    text2: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 20
    },
    text3: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    },
})
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(UsuarioPerfilPage);
