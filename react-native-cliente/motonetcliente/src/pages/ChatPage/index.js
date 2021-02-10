import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from 'react-native'


class ChatPage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    getListViewItem = (item) => {
        Alert.alert(item.key);
    }

    render() {
        return (

            <View style={{
                backgroundColor: "#fff",
                flex: 1,
            }}>

                <View style={{
                    backgroundColor: "#2C4C7E",
                    height: 50,
                    flexDirection: "row",
                    alignItems: "center"
                }}>

                    <View style={{
                    }}>
                        <Image style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            marginLeft: 5,
                            borderWidth: 2,
                            borderColor: "#fff",
                        }} source={{
                            // uri: url
                        }} />
                    </View>

                    <Text style={{
                        fontSize: 24,
                        textAlign: "center",
                        color: "#fff",
                        fontStyle: "italic",
                        fontWeight: "bold",
                    }}> Nombre
                    </Text>


                </View>

                <ScrollView style={{
                    flex: 1
                }}>

                    <View>
                        <FlatList
                            data={[
                                { key: 'Android' }, { key: 'iOS' }, { key: 'Java' }, { key: 'Swift' },
                                { key: 'Php' }, { key: 'Hadoop' }, { key: 'Sap' },
                                { key: 'Python' }, { key: 'Ajax' }, { key: 'C++' },
                                { key: 'Ruby' }, { key: 'Rails' }, { key: '.Net' },
                                { key: 'Perl' }, { key: 'Sap' }, { key: 'Python' },
                                { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                                { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                                { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                                { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                                { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                                { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                                { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                                { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                                { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                                { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                                { key: 'Rails' }, { key: '.Net' }, { key: 'Perl' }
                            ]}
                            renderItem={({ item }) =>
                                <Text style={styles.item}
                                    onPress={this.getListViewItem.bind(this, item)}>{item.key}</Text>}
                        //ItemSeparatorComponent={this.renderSeparator}                              
                        />
                    </View>

                </ScrollView>

                <View style={{
                    height: 55,
                    backgroundColor: "#ccc",
                    flexDirection: "row",
                }}>
                    <View style={styles.contenedorInput}>
                        <TextInput style={{
                        }}
                            //  onChangeText={text => this.handleChange(text, "pass")}
                            style={styles.Input}
                            placeholder={"Constraseñas"}
                            //value={this.state.pass.value}
                            placeholderTextColor="#626262"
                            color="#000"
                            autoCapitalize='none'
                        />
                    </View>

                    <View style={styles.contenedorEnviar}>
                        <TouchableOpacity
                            style={{
                                borderRadius: 20,
                                backgroundColor: "#fff",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 40
                            }} onPress={() => {
                                alert("dsfdsfd")
                            }}>
                            <Text>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
    }

}

const styles = StyleSheet.create({
    contenedorInput: {
        width: "100%",
        flex: 1,
        height: "100%",
        justifyContent: "center"
    },
    contenedorEnviar: {
        flex: 0.3,
        height: "100%",
        justifyContent: "center"
    },
    Input: {
        backgroundColor: "#DAE8FB",
        borderRadius: 30,
        color: "#000",
        borderColor: "#2C4C7E",
        borderWidth: 1,
        height: 40,
        paddingLeft: 15
    },
    error: {
        backgroundColor: "#DAE8FB",
        borderRadius: 30,
        color: "#000",
        borderColor: "red",
        borderWidth: 1,
        padding: 15
    },
    cargando: {
        marginTop: 20,
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#2176E7",
        borderRadius: 25,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default ChatPage
