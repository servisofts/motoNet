import React from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
const ListaBusqueda = (props) => {
    if (!props.state.locationGoogleMapReducer.listaBusqueda) {
        return <View />
    }
    var lista = props.state.locationGoogleMapReducer.listaBusqueda
    return (
        <View style={{
            flex: 1,
            width: "80%",
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            position: 'absolute',
            top: 70,
        }}>
            {lista.map((obj) => {
                return (
                    <View style={{
                        width: "100%",
                        height: 50,
                        flex: 1,
                        borderWidth: 2,
                        borderColor: '#ff000055',
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        margin: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <View style={{ flex: 0.2, }}>
                            <Svg name="MarkerMoto"
                                style={{
                                    width: 25,
                                    height: 25,
                                    fill: "#000"

                                }} />
                        </View>
                        <Text style={{
                            color: "#000",
                            fontSize: 12,
                            flex: 2,
                            margin: 5,
                        }}>{obj.direccion}</Text>
                    </View>
                )
            })
            }
        </View>
    )

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ListaBusqueda);
