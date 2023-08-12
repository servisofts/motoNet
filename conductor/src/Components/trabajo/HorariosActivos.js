import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText } from 'servisofts-component';

import { SDate, SHr, SIcon, SInput, SList, SLoad, SMapView, SMapView2, SMarker, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import BarraCargando from '../Components/BarraCargando';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var data = Model.conductor_horario.Action.getActivosByUser();
        const zonas = Model.zona.Action.getAll();
        if (!zonas) return null;
        if (!data) return <SLoad />
        data = Object.values(data).filter(obj => {
            var date = new SDate(obj.fecha + " " + obj.hora_fin, "yyyy-MM-dd hh:mm");
            return !date.isBefore(new SDate())
        })
        if (data.length <= 0) {
            return null;
        }
        return <SView col={"xs-12"} height={60} center backgroundColor={STheme.color.barColor}>
            <SView col={"xs-12"} center height>
                <SScrollView2 horizontal >
                    <SList
                        data={data}
                        horizontal
                        initSpace={8}
                        order={[
                            { key: "fecha", order: "asc", peso: 5 },
                            { key: "hora_inicio", order: "asc", peso: 1 },
                        ]}
                        render={(obj) => {
                            var zona = zonas[obj.key_zona];
                            return <SView width={150} height={50} card style={{
                                backgroundColor: "#fff"
                            }} center>
                                {/* <SText color={STheme.color.secondary} fontSize={12}>{new SDate(obj.fecha, "yyyy-MM-dd").toString("dd de MONTH")}</SText> */}
                                {/* <SText color={STheme.color.secondary} fontSize={12}>{obj.hora_inicio} - {obj.hora_fin}</SText> */}
                                <SText bold color={STheme.color.primary} fontSize={12}>Zona {zona.nombre}</SText>
                                <SText color={STheme.color.primary} fontSize={12}>{new SDate(obj.fecha, "yyyy-MM-dd").toString("DAY")} {obj.hora_inicio} a {obj.hora_fin}</SText>
                                <SHr height={4} />
                                <BarraCargando />
                            </SView>
                        }}
                    />
                </SScrollView2>
            </SView>
        </SView>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);