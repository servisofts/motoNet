import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import ButtonComponent from '../../component/ButtonComponent';
import ButtonServicioComponent from '../../component/ButtonServicioComponent';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import Svg from '../../Svg'
import NaviDrawer2 from '../../component/NaviDrawer2';
import ImgComponent from '../../component/ImgComponent';
import CarouselPage from '../CarouselPage';
import BarraSuperior from '../../component/BarraSuperior';
import SSCrollView from '../../component/SScrollView';
import BarraSuperiorInicio from '../../component/BarraSuperiorInicio';
import STheme from '../../STheme';


class ServicioPage extends Component {

    static navigationOptions = ({ navigation }) => (
        navigation.state.prop ? ({ ...navigation.state.prop }) : {}
    );

    constructor(props) {
        super(props);
        props.state.navigationReducer.setParams(props.navigation, {
            title: "sf",
            headerShown: false,
            headerTitleStyle: {
                color: '#fff',
            },
        })
    }

    getServicios() {
        return [
            {
                page: "InicioPage",
                nombreServicio: "Transporte",
                detalle: "A todo destino",
                nameSvg: "transporte"
            },
            {
                page: "PedidosRegistroPage",
                nombreServicio: "Pedidos",
                detalle: "De tus comercios favoritos",
                nameSvg: "pedidos"
            },
            {
                page: "MensajeriaRegistroPage",
                nombreServicio: "Mensajería",
                detalle: "Servicio de mensajería",
                nameSvg: "mensajeria"
            },
        ].map((obj) => {
            return <View style={{
                // flex: 1,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor:"#ccc"
            }}>
                <ButtonServicioComponent navigation={this.props.navigation} {...obj} />
            </View>
        });
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: STheme.color.primary + "fc",
            }}>
                {/* <ImgFondoCruces /> */}
                <BarraSuperiorInicio />
                <View style={{
                    flex: 1,
                }}>
                    <SSCrollView>
                        <View style={{
                            flex: 1,
                            justifyContent: "space-around"
                            // backgroundColor: "#ccc"
                        }}>
                            {this.getServicios()}

                        </View>

                        <View style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{
                                width: "90%", borderRadius: 8,
                                overflow: 'hidden',
                                marginBottom: 8,
                            }}>
                                <CarouselPage />
                            </View>
                        </View>
                    </SSCrollView>
                </View>

                <NaviDrawer2 navigation={this.props.navigation} />
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    sos: {
        color: "#fff",
        fontSize: Dimensions.get("window").width * 0.12,
        fontWeight: "bold",
        position: "absolute",
        // backgroundColor:"#000"    
    },
});


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ServicioPage);