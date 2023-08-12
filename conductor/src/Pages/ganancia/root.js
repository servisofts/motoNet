import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { SButtom, SDate, SHr, SIcon, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { SDate, SHr, SList, SLoad, SMath, SNavigation, SInput, SPopup, SPage, SText, STheme, SView, SIcon, SExcel } from 'servisofts-component';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';
import Container from '../../Components/Container';
import Pedido_item from './Pedido_item';


class root extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {
        Model.pedido.Action.getPendientesConciliacionDelivery({ key_conductor: Model.usuario.Action.getKey() }).then((resp) => {
            this.setState({ pendientes: resp.data, cantidad_recogidas: resp.cantidad, ultima_conciliacion: resp.ultima_conciliacion })
        }).catch(e => {
            console.error(e)
        })
    }
    getLista() {
        if (!this.state.pendientes) return <SLoad type='skeleton' col={"xs-12"} height={50} />
        return <SList
            data={this.state.pendientes}
            limit={20}
            order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(obj) => {
                return <Pedido_item data={obj} />
            }} />
    }

    head({ cantidadTotal }) {
        return <SView col={"xs-12"} row center card
            style={{
                backgroundColor: STheme.color.primary,
                borderRadius: 8
            }}
        >
            <SHr height={10} />
            <SText color={'#FFCCA2'} fontSize={18} bold>{(this?.state?.ultima_conciliacion?.fecha_cierre) ? "Última conciliación realizada: " + new SDate(this?.state?.ultima_conciliacion?.fecha_cierre).toString("yyyy-MM-dd") : "<Conciliación no realizada>" } </SText>
            <SHr />
            <SView flex height={2} />
            <SText color={STheme.color.secondary} bold fontSize={30}>Bs. {SMath.formatMoney(cantidadTotal)}</SText>
            <SHr height={10} />
            <SText color={STheme.color.secondary} fontSize={16} bold>TOTAL INGRESOS</SText>
            <SHr height={10} />
        </SView>
    }

    pagos({ efectivo, linea }) {
        return <SView col={"xs-12"} row center
            card
            style={{
                borderRadius: 8,
                backgroundColor: STheme.color.primary
            }}
        >
            <SHr height={10} />
            <SText fontSize={20} color={STheme.color.secondary} bold>PAGOS</SText>
            <SHr height={5} />
            <SView height={2} col={"xs-10"} style={{
                borderBottomColor: STheme.color.secondary,
                borderBottomWidth: 2
            }} />
            <SHr height={5} />
            <SView col={"xs-6"} row center
                style={{
                    borderRightColor: STheme.color.secondary,
                    borderRightWidth: 2
                }}
            >
                <SText fontSize={14} color={STheme.color.secondary} center bold>EN EFECTIVO</SText>
                <SHr />
                <SText fontSize={20} color={STheme.color.secondary}>Bs. </SText>
                <SText fontSize={20} bold color={STheme.color.secondary}>{SMath.formatMoney(efectivo)}</SText>
                <SHr />
            </SView>
            <SView col={"xs-6"} row center>
                <SText fontSize={14} color={STheme.color.secondary} bold>EN LÍNEA</SText>
                <SHr />
                <SText fontSize={20} color={STheme.color.secondary}>Bs. </SText>
                <SText fontSize={20} bold color={STheme.color.secondary}>{SMath.formatMoney(linea)}</SText>
                <SHr />
            </SView>
            <SHr height={15} />
        </SView>
    }

    gananciasLinea({ linea, gastos, deuda }) {
        return <SView col={"xs-12"} row center
            card
            style={{
                borderRadius: 8,
                backgroundColor: STheme.color.accent
            }}
        >
            <SHr height={10} />
            <SText fontSize={20} color={STheme.color.secondary} bold>GANANCIAS EN LÍNEA</SText>
            <SHr height={5} />
            <SView height={2} col={"xs-5"} style={{
                borderBottomColor: STheme.color.secondary,
                borderBottomWidth: 2
            }} />
            <SHr height={15} />
            <SView col={"xs-10"} row center >
                <SView col={"xs-6"} row center style={{ justifyContent: 'flex-start' }}>
                    <SText fontSize={13} color={STheme.color.secondary} center >Ingresos</SText>
                </SView>
                <SView col={"xs-6"} row center style={{ justifyContent: 'flex-end', }} >
                    <SText fontSize={13} color={STheme.color.secondary} center >Bs. {SMath.formatMoney(linea)}</SText>
                </SView>
            </SView>
            <SHr height={3} />
            <SView height={2} col={"xs-10"} style={{
                borderBottomColor: STheme.color.lightGray,
                borderBottomWidth: 1
            }} />
            <SView col={"xs-10"} row center >
                <SView col={"xs-6"} row center style={{ justifyContent: 'flex-start' }}>
                    <SText fontSize={13} color={STheme.color.secondary} center >Comision Tapeke</SText>
                </SView>
                <SView col={"xs-6"} row center style={{ justifyContent: 'flex-end', }} >
                    <SText fontSize={13} color={STheme.color.secondary} center >Bs. {SMath.formatMoney(gastos)}</SText>
                </SView>
            </SView>
            <SHr height={3} />
            <SView height={2} col={"xs-10"} style={{
                borderBottomColor: STheme.color.lightGray,
                borderBottomWidth: 1
            }} />
            <SView col={"xs-10"} row center >
                <SView col={"xs-6"} row center style={{ justifyContent: 'flex-start' }}>
                    <SText fontSize={20} color={STheme.color.secondary} center >Total</SText>
                </SView>
                <SView col={"xs-6"} row center style={{ justifyContent: 'flex-end', }} >
                    <SText fontSize={20} color={STheme.color.secondary}>Bs.</SText>
                    <SText fontSize={20} bold color={STheme.color.secondary} center > {deuda}</SText>
                </SView>
            </SView>
            <SHr height={15} />
        </SView>
    }

    deliveryDato({ title, cantidad, monto }) {
        return <SView col={"xs-5.75"} row center
            card
            style={{
                backgroundColor: STheme.color.accent,
                borderRadius: 8
            }}
        >
            <SHr height={10} />
            <SText fontSize={20} color={STheme.color.secondary} bold>{title}</SText>
            <SHr height={5} />
            <SView height={2} col={"xs-5"} style={{
                borderBottomColor: STheme.color.secondary,
                borderBottomWidth: 2
            }} />
            {/* <SView col={"xs-12"} row center>
                    <SHr />
                    <SIcon name='Idelivery' height={56} fill={STheme.color.white} />
                </SView> */}
            <SHr height={15} />
            <SView col={"xxs-12 xs-12 sm-5 md-5 lg-5 xl-5"} row center>
                <SText fontSize={14} color={STheme.color.secondary} center bold>CANTIDAD</SText>
                <SHr />
                <SText fontSize={25} bold color={STheme.color.secondary}>{cantidad}</SText>
                <SHr />
            </SView>
            {/* <SView col={"xxs-12 xs-12 sm-7 md-7 lg-7 xl-7"} row center>
                <SText fontSize={14} color={STheme.color.secondary} bold>INGRESOS</SText>
                <SHr />
                <SText fontSize={20} color={STheme.color.secondary}>Bs. </SText>
                <SText fontSize={25} bold color={STheme.color.secondary}>{SMath.formatMoney(monto)}</SText>
                <SHr />
            </SView> */}
            <SHr height={10} />
        </SView>
    }

    getTableDetail() {
        if (!this.state.pendientes) return <SLoad />
        console.log("-------")
        console.log(this.state.pendientes);
        let cantidad_delivery = 0;

        let total = {
            efectivo: 0,
            linea: 0,
            comision_efectivo: 0,
            comision_linea: 0,
            total: 0,
            comision_total: 0
        }
        let incentivos_f_especial = 0;
        let incentivos_f_especial_monto = 0;
        let incentivos_lluvia = 0;
        let incentivos_lluvia_monto = 0;

        let datenow = new SDate(this.state.fecha, "yyyy-MM-dd");
        this.keys_pedidos = [];
        let arrayFinal = Object.values(this.state.pendientes).filter(a => datenow.isAfter(new SDate(a.fecha_on)) || datenow.equalDay(new SDate(a.fecha_on)))
        arrayFinal.map(obj => {
            this.keys_pedidos.push(obj.key);

            let data_in_de = (obj.incentivos ?? []).find(a => a.tipo == "dia_especial");
            if (!!data_in_de) {
                incentivos_f_especial += 1;
                incentivos_f_especial_monto += data_in_de.monto_driver;
            }
            let data_in_ll = (obj.incentivos ?? []).find(a => a.tipo == "lluvia");
            if (!!data_in_ll) {
                incentivos_lluvia += 1;
                incentivos_lluvia_monto += data_in_ll.monto_driver;
            }

            if (obj.delivery > 0) {
                cantidad_delivery += 1;
            }
            if (obj.tipo_pago.find(a => a.type == "efectivo")) {
                total.efectivo += parseFloat(obj.delivery + (data_in_de?.monto ?? 0) + (data_in_ll?.monto ?? 0))
                total.comision_efectivo += obj.comision_delivery;
            } else {
                total.linea += parseFloat(obj.delivery + (data_in_de?.monto ?? 0) + (data_in_ll?.monto ?? 0))
                total.comision_linea += obj.comision_delivery;
            }

            total.total += parseFloat(obj.delivery + ((data_in_de?.monto ?? 0) + (data_in_ll?.monto ?? 0)))
            total.comision_total += (obj.comision_delivery + ((data_in_de?.monto ?? 0) - (data_in_de?.monto_driver ?? 0)) + ((data_in_ll?.monto ?? 0) - (data_in_ll?.monto_driver ?? 0)));
        })
        // lettotal.total - total.comision_total
        this.deuda = parseFloat((total.linea - total.comision_total)).toFixed(2);
        return <SView col={"xs-12"} >
            {/* <SHr /> */}
            {/* <SText>Ultima conciliacion: {new SDate(this.state?.ultima_conciliacion?.fecha_cierre).toString("yyyy-MM-dd")}</SText> */}
            <SHr />
            {this.head({ cantidadTotal: total.total })}
            <SHr height={10} />
            <SView col={"xs-12"} row style={{ justifyContent: "space-between" }}>
                {this.deliveryDato({ title: "Entregados", cantidad: cantidad_delivery, monto: cantidad_delivery })}
                {this.deliveryDato({ title: "Retiros del local", cantidad: this.state.cantidad_recogidas, monto: this.state.cantidad_recogidas })}
                <SHr />
                {this.deliveryDato({ title: "Fechas especiales", cantidad: incentivos_f_especial, monto: incentivos_f_especial_monto })}
                {this.deliveryDato({ title: "Lluvia", cantidad: incentivos_lluvia, monto: incentivos_lluvia_monto })}
            </SView>
            {/* {this.deliveryDato({ cantidadDelivery: cantidad_delivery, gananciaDelivery: cantidad_delivery * 1, cantidadRecoger: this.state.cantidad_recogidas, gananciaRecoger: this.state.cantidad_recogidas * 1 })} */}
            <SHr height={10} />
            {/* {this.deliveryDato2({ cantidadDelivery: incentivos_f_especial, gananciaDelivery: incentivos_f_especial * 1, cantidadRecoger: incentivos_lluvia, gananciaRecoger: incentivos_lluvia * 1 })} */}
            <SHr height={10} />
            {this.pagos({ efectivo: total.efectivo, linea: total.linea })}
            <SHr height={10} />
            {this.gananciasLinea({ linea: total.linea, gastos: total.comision_total, deuda: this.deuda })}
            <SHr height={10} />
        </SView>
    }
    getHeader() {

        return <SView col={"xs-12"} center>
            <SHr />
            {/* <SView col={"xs-12"} row center backgroundColor={STheme.color.primary}
                style={{
                    borderRadius: 8
                }}
            >
                <SHr height={10} />
                <SText color={"#FFCCA2"} fontSize={15} bold>
                    {new SDate().toString("dd/MM")}
                </SText>
                <SHr height={5} />
                <SText color={STheme.color.white} bold fontSize={30}>Bs. 7000</SText>
                <SHr height={5} />
                <SText color={STheme.color.white} fontSize={16} bold>GANANCIAS DE LA SEMANA</SText>
                <SHr height={10} />
            </SView>
            <SHr height={10} />
            <SView col={"xs-12"} row center
                backgroundColor={"#96BE00"}
                style={{
                    borderRadius: 8
                }}
            >
                <SView col={"xs-5.7"} row center>
                    <SHr height={10} />
                    <SText fontSize={14} color={STheme.color.white} bold>DISTANCIA TOTAL</SText>
                    <SHr />
                    <SText fontSize={25} bold color={STheme.color.white}>120 Km</SText>
                    <SHr height={15} />
                </SView>
                <SView col={"xs-0.4"} height={50}
                    style={{
                        borderRightColor: STheme.color.white,
                        borderRightWidth: 2
                    }}
                ></SView>
                <SView col={"xs-5.7"} row center >
                    <SHr height={10} />
                    <SText fontSize={14} color={STheme.color.white} bold>NRO VIAJES</SText>
                    <SHr />
                    <SText fontSize={25} bold color={STheme.color.white}>150</SText>
                    <SHr height={15} />
                </SView>
            </SView> */}
            <SHr height={15} />
            {this.getTableDetail()}
            <SHr height={15} />
            <SView col={"xs-12"} flex center >
                <SView col={"xs-10"} backgroundColor={STheme.color.primary}  center
                    height={55}
                    style={{
                        borderRadius: 8
                    }}
                    onPress={() => {
                        SNavigation.navigate("/ganancia/historial");
                    }}
                >
                    <SView row>
                        <SIcon name='Iganancia' height={27} width={27} />
                        <SView width={8} />
                        <SText fontSize={15} color={STheme.color.white} bold>Ver historial de conciliaciones</SText>
                    </SView>
                </SView>
            </SView>
        </SView>
    }

    render() {
        return (<SPage hidden header={<TopBar type={"default"} title={"Ganancias"} />}
            onRefresh={(resolve) => {
                this.componentDidMount();
            }}>
            <SView backgroundColor={STheme.color.accent} height={20} col={"xs-12"}></SView>
            <Container>
                <SHr />
                {this.getHeader()}
                <SHr height={15} />
                <SView col={"xs-12"} flex>
                    <SText bold fontSize={18} >Historial de pedidos</SText>
                </SView>
                <SHr height={10} />
                {this.getLista()}
                <SHr height={30} />
            </Container>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);