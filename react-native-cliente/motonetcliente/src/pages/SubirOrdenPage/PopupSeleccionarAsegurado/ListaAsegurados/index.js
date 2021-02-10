import React from 'react';
import { connect } from 'react-redux'

import { ScrollView, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
const ListaAsegurados = (props) => {
        if (!props.state.seguroReducer.data) {
            if (props.state.seguroReducer.estado == "cargando") { 
                return <Text>Cargando</Text>
            }
            props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                component: "codigoSeguro",
                type: "getAllByUsuario",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            return <Text>Cargando</Text>
        }
        
        var data = props.state.seguroReducer.data;
        if (Object.keys(data).length <= 0) {
            return <View style={{
                width: "100%",
                height:300,
                justifyContent:"center",
                alignItems:"center"
            }}>
                <Text>No se encontraron resultados.</Text>
            </View>
        }
        var lista = Object.keys(data).map((key) => {
            var obj = data[key];
            return (
                <TouchableOpacity style={{
                    flex: 1,
                    flexDirection: "row",
                    margin: 8,
                    backgroundColor: "#2C4C7E",
                    borderRadius:8,

                }}
                onPress={() => {
                    props.callback(obj);
                    // // alert("sdsds")
                    // if (props.navigation.state.params) {
                    //     if (props.navigation.state.params.tipo == "asignarAutorizacion") {
                    //         props.navigation.navigate("SubirOrdenPage", { obj: obj });
                    //     }
                    // }

                }}
                >
                    <View style={{
                        flex: 3,
                        borderRadius: 5,
                        // flexDirection: "row",
                        width:"100%",
                        justifyContent: "center",
                        // alignItems: "center",
                        // marginEnd:10
                        padding: 15,
                        backgroundColor: "#cccs"
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 15,
                            marginTop:8,
                            width:"100%"
                        }}>
                            Nombre completo:
                             <Text style={{
                                color: "#fff",
                                fontSize: 20,
                                fontWeight:"bold",
                                textAlign:"center",
                                width:"100%"
                            }}>{obj.nombre}</Text>
                        </Text>
                        <Text style={{
                            color: "#fff",
                            fontSize: 15,
                            marginTop:8,
                        }}>
                            Codigo seguro: 
                            
                            <Text style={{
                                color: "#fff",
                                fontSize: 20,
                                fontWeight:"bold",
                            }}>{obj.codigo}</Text>
                        </Text>
                        <Text style={{
                            color: "#fff",
                            fontSize: 15,
                            marginTop:8,
                        }}>
                            Tipo de segurado:  <Text style={{
                                color: "#fff",
                                fontSize: 20,
                                fontWeight:"bold",
                            }}>{obj.tipo.toUpperCase()}</Text>
                        </Text>
                    </View>
                            {/* {this.getIconClick()} */}
                </TouchableOpacity >
            )
            
        })

        return (
            <ScrollView style={{
                width:"100%",
                height:"100%",
                flex:1
            }}>
                {lista}
            </ScrollView>
        )

}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ListaAsegurados);
