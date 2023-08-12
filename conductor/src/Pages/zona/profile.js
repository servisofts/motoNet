import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Header from '../../Components/Header';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';

class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            h: 50,
            hheader: 16,
            widthTitle: 40,
            date: new SDate().setHours(0, 0, 0, 1),
            select: {}
        };
        this.key = SNavigation.getParam("key")
        if (!this.key) SNavigation.goBack();

    }

    getHora(hora) {
        var date = new SDate("00:00", "hh:mm");
        date.setHours(parseInt(hora), parseInt((hora % 1).toFixed(2) * 100), null, null);
        return <SView height={this.state.h} col={"xs-12"}>
            <SView center row col={"xs-12"} height={this.state.hheader}>
                <SView width={this.state.widthTitle} >
                    <SText fontSize={12}>{date.toString("hh:mm")}</SText>
                </SView>
                <SView flex>
                    <SHr height={1} color={STheme.color.card} />
                </SView>

            </SView>
        </SView>
    }


    renderConductores() {
        var color = "#d5b192";
        var conductor_horarios = Model.conductor_horario.Action.getByDate({ key_zona: this.key, fecha: this.state.date.toString("yyyy-MM-dd") })
        if (!conductor_horarios) return <SLoad />
        console.log(conductor_horarios)
        return Object.values(conductor_horarios).map((obj) => {
            if (obj.key_usuario != Model.usuario.Action.getKey()) return null;
            var hora_ini = new SDate(obj.hora_inicio, "hh:mm").toString("hh");
            var minuto_ini = (parseFloat(new SDate(obj.hora_inicio, "hh:mm").toString("mm") / 60));
            var minuto_fin = (parseFloat(new SDate(obj.hora_fin, "hh:mm").toString("mm") / 60));
            var hora_fin = new SDate(obj.hora_fin, "hh:mm").toString("hh");
            var isSelect = this.state.select.hora_inicio == obj.hora_inicio && this.state.select.hora_fin == obj.hora_fin;
            return <SView col={"xs-12"} style={{
                position: "absolute",
                top: (this.state.hheader / 2) + (this.state.h * (hora_ini)) + (this.state.h * minuto_ini),
                right: 0,
                height: (((this.state.h * (hora_fin - hora_ini)) + (this.state.h * (minuto_fin))) - (this.state.h * minuto_ini)),
            }} row>
                <SView width={this.state.widthTitle} />
                <SView flex height style={{
                    padding: 1,
                }} center>
                    <SView flex col={"xs-12"} style={{
                        backgroundColor: isSelect ? color + "CC" : color + "65",
                        borderRadius: 6,
                        overflow: 'hidden',
                    }} row onPress={() => {
                        // AQUI ES EL ONPRESS DE LAS CARTAS DE LOS EVENTOS
                        // this.state.select = obj;
                        // this.setState({ ...this.state })
                        // SNavigation.navigate("/zona/confirm", { key: this.key, hi: obj.hora_inicio, hf: obj.hora_fin, fecha: this.state.date.toString("yyyy-MM-dd") })
                    }}>

                        <SView flex height style={{
                            padding: 1,
                            alignItems: 'flex-end',
                        }}>
                            <SText color={STheme.color.text} size={14} bold>OCUPADO</SText>
                        </SView>
                        <SView height width={5} backgroundColor={color} />
                    </SView>
                </SView>
            </SView>
        })
    }
    renderHorarios() {
        this.enviroments = Model.enviroment.Action.getAll();
        let horarios = Model.zona.Action.getHorarios();
        if (!this.enviroments || !horarios) return <SLoad />
        var zonas = Model.zona.Action.getHorariosReducidosByKey(this.key, this.state.date.getDayOfWeek(), this.enviroments);

        if (!zonas) return <SLoad />


        return zonas.map((obj) => {
            var hora_ini = new SDate(obj.hora_inicio, "hh:mm").toString("hh");
            var minuto_ini = (parseFloat(new SDate(obj.hora_inicio, "hh:mm").toString("mm") / 60));

            let datef = new SDate(obj.hora_fin, "hh:mm");
            datef.addSecond()
            let str_date_fin = obj.hora_fin;
            var minuto_fin = (parseFloat(new SDate(str_date_fin, "hh:mm").toString("mm") / 60));
            var hora_fin = new SDate(str_date_fin, "hh:mm").toString("hh");
            var isSelect = this.state.select.hora_inicio == obj.hora_inicio && this.state.select.hora_fin == obj.hora_fin;
            return <SView col={"xs-12"} style={{
                position: "absolute",
                top: (this.state.hheader / 2) + (this.state.h * (hora_ini)) + (this.state.h * minuto_ini),
                right: 0,
                height: (((this.state.h * (hora_fin - hora_ini)) + (this.state.h * (minuto_fin))) - (this.state.h * minuto_ini)),
            }} row>
                <SView width={this.state.widthTitle} />
                <SView flex height style={{
                    padding: 1,
                }} >
                    <SView flex style={{
                        backgroundColor: isSelect ? STheme.color.primary + "CC" : STheme.color.primary + "55",
                        borderRadius: 6,
                        overflow: 'hidden',
                    }} row onPress={() => {
                        // AQUI ES EL ONPRESS DE LAS CARTAS DE LOS EVENTOS
                        // this.state.select = obj;
                        // this.setState({ ...this.state })
                        SNavigation.navigate("/zona/confirm", { key: this.key, hi: obj.hora_inicio, hf: obj.hora_fin, fecha: this.state.date.toString("yyyy-MM-dd") })
                    }}>
                        <SView height width={5} backgroundColor={STheme.color.primary} />

                        <SView flex height center style={{
                            padding: 1
                        }}>
                            <SText color={STheme.color.primary} fontSize={18} bold>{obj.hora_inicio} - {obj.hora_fin} </SText>
                        </SView>
                        <SView
                            style={{
                                alignItems: "flex-end",
                                position: "absolute",
                                right: 5,
                                top: 4
                            }}
                        >
                            <SIcon name={"Date"} height={40} fill={STheme.color.white} />
                        </SView>
                    </SView>
                </SView>
            </SView>
        })
    }
    render() {
        var zona = Model.zona.Action.getByKey(this.key);
        // if (!zona) return <SLoad />


        return <>
            <SPage title={(zona ? "Zona " + zona.nombre : <SLoad color={"#fff"} />)} onRefresh={() => {
                Model.zona.Action.CLEAR();
                Model.conductor_horario.Action.CLEAR();
                Model.enviroment.Action.CLEAR();
            }}

            >
                <SView col={"xs-12"} center>

                    <SHr height={100} />
                    <SView col={"xs-11.5 sm-10 md-8 lg-6 xl-4 xxl-3"} center>
                        <SList
                            initSpace={40}
                            space={0}
                            data={[...Array(25).keys()]}
                            render={h => {
                                return <>
                                    {this.getHora(h)}
                                    {/* {this.getHora(h + 0.15)} */}
                                    {/* {this.getHora(h + 0.30)} */}
                                    {/* {this.getHora(h + 0.45)} */}
                                </>
                            }}
                        />
                        <SHr height={100} />
                        {this.renderHorarios()}
                        {this.renderConductores()}
                    </SView>

                </SView>

            </SPage>
            <SView col={"xs-12"} backgroundColor={STheme.color.primary} center style={{
                position: "absolute",
                top: 40
            }}>
                <SView col={"xs-11.5"} >
                    <SHr height={4} />
                    <SText fontSize={18} bold color={STheme.color.secondary}>{this.state.date.toString("dd de MONTH yyyy")}</SText>
                    <SHr height={4} />
                    <SView row center>
                        <SView width={24} height={24} style={{ padding: 6, }} onPress={() => {
                            if (this.state.date.isAfter(new SDate())) {
                                this.state.date.addDay(-1);
                            }
                            this.setState({ ...this.state })
                        }}>
                            <SIcon name='Arrow' fill={"#fff"} />
                        </SView>
                        <SView width={6} />
                        <SText fontSize={16} width={100} center color={STheme.color.secondary}>{this.state.date.toString("DAY")}</SText>
                        <SView width={6} />
                        <SView width={24} height={24} style={{ padding: 6, transform: [{ rotateY: "180deg" }] }} onPress={() => {
                            this.state.date.addDay(1);
                            this.setState({ ...this.state })
                        }}>
                            <SIcon name='Arrow' fill={"#fff"} />
                        </SView>
                        <SView flex />
                    </SView>
                    <SHr height={4} />
                    {/* <SHr height={1} color={STheme.color.card} /> */}
                </SView>
                <Header />
            </SView>
        </>
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(profile);