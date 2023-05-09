import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import Boton1 from '../Components/Boton1'
import { STheme } from 'servisofts-component'
// import Boton1 from '../../../component/Boton1'

const ModalOferta = (props) => {

    const getCondutor = () => {
        var data = {
            Nombres: "TName",
            Apellidos: "TLN",
            Correo: "test@gmail.com"
        }
        return (
            <View style={{
                alignItems: "center"
            }}>
                <View style={{
                    backgroundColor: "#ccc",
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    marginTop: 10,
                    marginBottom: 10
                }}>
                </View>
                <Text>
                    {data["Nombres"]} {data["Apellidos"]}
                </Text>
                <Text>
                    {data["Correo"]}
                </Text>
                <Text style={{
                    color: "#000",
                    fontSize: 20,
                    fontWeight: "bold"
                }}>Bs. { }</Text>

            </View>
        )
    }


    return (
        <View style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: STheme.color.card,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{
                width: 300,
                height: 250,
                backgroundColor: "#fff",
                borderRadius: 20,
                // justifyContent: "center",
                // alignItems: "center"
            }}>
                <View style={{
                    width: "100%",
                    // backgroundColor:"#ccc",
                    alignItems: "center"
                }}>
                    {getCondutor()}
                </View>
                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "#ccc"
                }}>
                    <View style={{
                        width: 100
                    }}>
                        <Boton1
                            label="Buscar Otro"
                            type="4"
                            onPress={() => { }}
                            cargando={false} />
                    </View>
                    <View style={{
                        width: 100
                    }}>
                        <Boton1
                            label="Aceptar"
                            type="1"
                            onPress={() => { }}
                            cargando={false} />
                    </View>
                </View>
            </View>
        </View>
    )
}


const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ModalOferta);
