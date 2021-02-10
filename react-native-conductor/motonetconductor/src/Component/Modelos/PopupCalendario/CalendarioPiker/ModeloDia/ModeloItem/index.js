import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ReactComponent as GruposHomeW } from "../../../../img/gruposHomeWhite.svg";
import GruposHome from "../../../../img/gruposHomeWhite.svg";
import Svg from '../../../../elementsM/Svg';
import Foto from '../../../../elementsM/Foto';


import * as popupGrupoActions from '../../../../actions/popupGrupoActions'
const initActions = ({
    ...popupGrupoActions
});

const ModeloItem = (props) => {

    const [isVisible, setisVisible] = React.useState(false);
    const [isRedirec, setisRedirec] = React.useState(false);
    const [numbers, setNumbers] = React.useState(false);
    const handleClick = (item) => {

        setisRedirec(true);
    }

    var isload = false;
    var year = props.fecha.format("YYYY");
    var month = props.fecha.format("MM");
    var day = props.fecha.format("DD");

    if (props.state.calendarioReducer.years[year]) {
        if (props.state.calendarioReducer.years[year].months[parseInt(month)]) {
            if (props.state.calendarioReducer.years[year].months[parseInt(month)].days) {
                if (props.state.calendarioReducer.years[year].months[parseInt(month)].days[day]) {
                    isload = true;
                    if (!numbers) {
                        setNumbers(props.state.calendarioReducer.years[year].months[parseInt(month)].days[day] || []);
                        return <View />
                    }

                }
            } else {
                if (numbers) {
                    setNumbers(false);
                }
            }
        }

    }

    const ventana =()=>{
        console.log(numbers);
        props.abrirPopupGrupo(numbers);

        return <View/>

    }


    if (!numbers) {
        return <View />
    }

    return (
        <View style={{ width: "100%", height: "100%", alignContent: "flex-end" }}>
            {numbers.map((num, index) => {
                if (index > 4) {
                    return <View />
                }
                return (
                    <View style={{ width: 25, height: 25, borderWidth: 1, borderRadius: 100, overflow: "hidden", position: "absolute", left: ((index) * 6), top: ((index) * 6), justifyContent: "center", alignContent: "center" }}>
                     
                        <Svg src={GruposHome} srcw={GruposHomeW} style={{ width: 20, height: 20, fill: "#fff" }} />
                        <View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                            <Foto nombre={num.key_grupo + ".png"} tipo={"grupo"} />
                        </View>


                    </View>

                )
            })}
            <View style={{ width: 20, height: 20, bottom: 0, position: "absolute" }}>
                <TouchableOpacity onPress={ventana}>
                <Text style={{ color: "#999999" }}>+{numbers.length}</Text>

                </TouchableOpacity>
            </View>
        </View>



    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: '100%',
        justifyContent: 'center',
    },
    iten: {
        flex: 1,
        width: 20,
        height: 20,
    },
    grupo: {
        alignItems: 'center',
        borderColor: "#fff",
        borderRadius: 100,
        borderWidth: 5,
        justifyContent: "center",
        width: 110,
        height: 110,
    },
    descripcion: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold"
    },
});








const initStates = (state) => {
    return { state }
};
export default connect(initStates,initActions)(ModeloItem);
