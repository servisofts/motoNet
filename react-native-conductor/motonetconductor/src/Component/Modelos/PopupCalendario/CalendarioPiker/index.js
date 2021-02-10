import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment'
import ModeloDia from './ModeloDia';
import ModeloOtro from './ModeloOtro';
import * as calendarioActions from '../../../../Actions/calendarioActions'


const initActions = ({
    ...calendarioActions
});




const CalendarioPiker = (props) => {


    const [obj, setObj] = React.useState({
        moment: Moment()
    });
    const masAños = () => {
        obj.moment.add(1, 'year')
        props.state.calendarioReducer.estado = false;
        setObj({ ...obj })
        return <View />
    }
    const menosAños = () => {
        obj.moment.add(-1, 'year')
        props.state.calendarioReducer.estado = false;
        setObj({ ...obj })
        return <View />
    }
    const izquierda = () => {
        obj.moment.add(-1, 'month')
        props.state.calendarioReducer.estado = false;
        setObj({ ...obj })
        return <View />
    }
    const derecha = () => {
        obj.moment.add(1, 'month')
        props.state.calendarioReducer.estado = false;
        setObj({ ...obj })
        return <View />
    }
    const hoy = () => {
        obj.moment = Moment();

        setObj({ ...obj })
        return <View />
    }





    const getDias = () => {
        var fecha = Moment(obj.moment.format('YYYYMM') + "01", "YYYYMMDD");
        fecha.startOf('week')
        fecha.add(-1, "day")
        const dias = (


            [1, 2, 3, 4, 5, 6].map((index) => {
                return (

                    <View style={{ justifyContent: 'center', flexDirection: 'row', width: 500, maxWidth: "100%", }}>
                        <ModeloDia momentActucal={obj.moment} moment={fecha.add(1, "day").format('YYYYMMDD')}></ModeloDia>
                        <ModeloDia momentActucal={obj.moment} moment={fecha.add(1, "day").format('YYYYMMDD')}></ModeloDia>
                        <ModeloDia momentActucal={obj.moment} moment={fecha.add(1, "day").format('YYYYMMDD')}></ModeloDia>
                        <ModeloDia momentActucal={obj.moment} moment={fecha.add(1, "day").format('YYYYMMDD')}></ModeloDia>
                        <ModeloDia momentActucal={obj.moment} moment={fecha.add(1, "day").format('YYYYMMDD')}></ModeloDia>
                        <ModeloDia momentActucal={obj.moment} moment={fecha.add(1, "day").format('YYYYMMDD')}></ModeloDia>
                        <ModeloDia momentActucal={obj.moment} moment={fecha.add(1, "day").format('YYYYMMDD')}></ModeloDia>




                    </View>
                )
            })
        )

        return (dias);

    }

    return (


        <View style={{
            maxWidth: "100%",
            width: '100%',
            flexDirection: "row",
            justifyContent: "center",
            height: "100%",
            backgroundColor: '#000',
            minHeight: Dimensions.get("window").height
        }}>

            <View style={{
                padding: 15,
                margin: 10,
                maxWidth: "100%",
                width: 420,
                flexDirection: 'column'
            }}>



                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>


                    <View style={{
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={masAños} style={{
                            flex: 1,
                            alignItems: "flex-end",
                            paddingLeft: 60,
                        }}>
                            <View style={{ width: 20,
                                height: 20, borderWidth: 1, borderRadius: 5, borderColor: "#fff",}}>
                                <Text style={{ textAlign: "center", fontWeight: "bold", color: "#fff", fontSize: 15, }}>+</Text>

                            </View>
                        </TouchableOpacity>


                        <Text style={{ color: '#fff', alignContent: 'flex-end', fontWeight: 'bold', fontSize: 25 }}>{obj.moment.format('MMMM')}, {obj.moment.format('YYYY')} </Text>
                        <TouchableOpacity onPress={menosAños}
                            style={{
                                flex: 1,
                                alignItems: "flex-end",
                                paddingLeft: 60,
                            }}>
                            <View style={{
                                width: 20,
                                height: 20,
                                borderWidth: 1,
                                borderRadius: 5,
                                borderColor: "#fff",
                            }}>
                                <Text style={{ textAlign: "center", fontWeight: "bold", color: "#fff", fontSize: 15, }}>-</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ModeloOtro lado={izquierda} style={styles.modelootro} dia='<'></ModeloOtro>
                        <ModeloOtro lado={hoy} style={styles.modelootro} dia='Hoy'></ModeloOtro>
                        <ModeloOtro lado={derecha} style={styles.modelootro} dia='>'></ModeloOtro>
                    </View>

                </View>
                {/*MES*/}
                <View style={{ justifyContent: 'center', marginTop: 0, flexDirection: 'column', }}>
                    <View style={{ flexDirection: 'row', marginTop: 0, alignItems: 'center', justifyContent: 'center', }}>
                        <ModeloOtro style={styles.modelootro2} dia='D'></ModeloOtro>
                        <ModeloOtro style={styles.modelootro2} dia='L'></ModeloOtro>
                        <ModeloOtro style={styles.modelootro2} dia='M'></ModeloOtro>
                        <ModeloOtro style={styles.modelootro2} dia='M'></ModeloOtro>
                        <ModeloOtro style={styles.modelootro2} dia='J'></ModeloOtro>
                        <ModeloOtro style={styles.modelootro2} dia='V'></ModeloOtro>
                        <ModeloOtro style={styles.modelootro2} dia='S'></ModeloOtro>
                    </View>
                    {/*SEMANA*/}
                    <View style={{ flex: 1, marginTop: 10 }}>
                        {getDias()}

                    </View>

                </View>
            </View>
        </View>




    );
}
const styles = StyleSheet.create({
    modelootro: {
        borderColor: '#fff',
        borderWidth: 1,
        width: 30,
        height: 30,
        margin: 2,
        fontSize: 15,
        borderRadius: 5,
        justifyContent: "center"
    },
    modelootro2: {
        flex: 1,
        width: 55,
        textAlign: "center",
        color: '#fff',
        fontSize: 15,
    },


});


const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(CalendarioPiker);
