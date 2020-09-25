import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ButtonRegistro from '../../component/LoginComponent/ButtonRegistro'
import Svg from '../../Svg'

export class LoginPage extends Component {

    static navigationOptions = ({ navigation }) => (
        {
            headerShown: false
        }
    );
    constructor(props) {
        super(props);
        this.state = {
            usr: {
                value: "",
                error: false
            },
            pass: {
                value: "",
                error: false
            },
        };
    }

    handleChange = (event, id) => {
        this.state[id] = {
            value: event,
            error: false,
        }
        this.setState({ ...this.state })
    };

    handleClick = () => {
        this.props.navigation.navigate("RegistroUsuarioPage");
    };

    handleClick2 = () => {
        this.props.navigation.navigate("InicioPage");
    };


    render() {
        return (
            <View style={{
                backgroundColor: "#FC363B",
                flex: 1
            }}>
                <View style={{
                    flex: 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Svg name="Logo"
                        style={{
                            width: 200,
                            height: 200,
                        }} />
                </View>

                <View style={{
                    flex: 1,
                    alignItems: "center"
                }}>
                    <View
                        style={{
                            width: '80%',
                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            color: "#000",
                            borderColor: "#fff",
                            borderWidth: 1,
                            padding: 15
                        }}>
                        <TextInput style={{
                        }}
                            onChangeText={(text) => this.handleChange(text, "usr")}
                            value={this.state.usr.value}
                            // style={(obj.usr.error ? styles.error : styles.touch2)}
                            placeholder={"Usuario"}
                            placeholderTextColor="#626262"
                            color="#000"
                            autoCapitalize='none'
                        />
                    </View>

                    <View
                        style={{
                            width: '80%',
                            flexDirection: 'row',
                            marginTop: 20,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            color: "#000",
                            borderColor: "#fff",
                            padding: 15,
                            borderWidth: 1,
                        }}>
                        <TextInput
                            onChangeText={text => this.handleChange(text, "pass")}
                            //style={(obj.pass.error ? styles.error : styles.touch2)}
                            value={this.state.pass.value}
                            placeholder={"Password"}
                            secureTextEntry
                            placeholderTextColor="#626262"
                            autoCapitalize='none'
                        />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        with: "100%",
                        alignItems: "center",
                        marginTop: 30
                    }}>
                        <View style={{
                            alignItems: "center"
                        }}>
                            <ButtonRegistro titulo="INICIAR SESSION" estilo="sign" click={this.handleClick2} />
                        </View>
                        <View style={{
                            alignItems: "center"
                        }}>
                            <ButtonRegistro titulo="REGISTRAR" estilo="create" click={this.handleClick} />
                        </View>
                    </View>

                    <ButtonRegistro titulo="Ingresar con facebook" estilo="facebook" click={this.handleClick} />

                    <ButtonRegistro titulo="Ingresar con Email" estilo="email" />

                </View>
            </View>
        )
    }
}

export default LoginPage
