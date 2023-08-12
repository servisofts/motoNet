import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SInput, SList, SLoad, SNavigation, SPage, SText, STheme, SView, SMapView, SPopup } from 'servisofts-component';
import Container from '../../Components/Container';
import PButtom from '../../Components/PButtom';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';

class confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.params = SNavigation.getAllParams();
        this.key = SNavigation.getParam("key")
    }

    renderZona() {
        var obj = Model.zona.Action.getByKey(this.key);
        if (!obj) return <SLoad />
        return <SView col={"xs-12"} card center
            style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#dedede"
            }}
        >
            <SView col={"xs-12"} center row>
                <SView width={50} height={50} style={{
                    padding: 4
                }}>
                    <SView flex height style={{
                        borderRadius: 8,
                        backgroundColor: STheme.color.primary,
                    }} center>
                        <SText style={{ textTransform: "uppercase" }} bold color={STheme.color.white}>{obj.nombre.substring(0, 1)}</SText>
                    </SView>
                </SView>
                <SView width={10}>

                </SView>
                <SView flex style={{
                    justifyContent: 'center',
                }}>
                    <SText fontSize={12} color={STheme.color.lightGray}>Zona</SText>
                    <SText style={{ textTransform: "capitalize" }} fontSize={16}>{obj.nombre}</SText>
                    <SHr />

                </SView>
            </SView>
            <SView col={"xs-12"} height={300}>
                <SMapView initialRegion={{
                    latitude: obj.latitude,
                    longitude: obj.longitude,
                    latitudeDelta: (obj.radio * 2) * 0.000009,
                    longitudeDelta: (obj.radio * 2) * 0.000009,
                }}

                // showsUserLocation={true}

                >
                    <></>
                    {this.getZona(obj.key)}
                </SMapView>

            </SView>
            {/* <SView col={"xs-12"} height style={{
                position: "absolute",
                // backgroundColor:"#f0f"
            }} onPress={() => {
                SNavigation.navigate("/zona/profile", { key: obj.key })
            }}>

            </SView> */}
        </SView>
    }
    getZona(key_zona) {
        const zonas = Model.zona.Action.getByKey(key_zona);
        if (!zonas) return null;
        var obj = zonas;
        return <SMapView.SCircle
            strokeColor={STheme.color.primary + "44"}
            // strokeOpacity={0.8}
            strokeWidth={2}
            fillColor={STheme.color.primary + "44"}
            // fillOpacity={0.3}
            center={{
                latitude: obj.latitude,
                longitude: obj.longitude
            }}
            radius={obj.radio}

        />

    }
    renderButtom() {
        return <PButtom loading={this.state.loading} onPress={() => {
            this.setState({ loading: true })
            Model.conductor_horario.Action.registro({
                data: {
                    key_zona: this.key,
                    hora_inicio: this._hi.getValue(),
                    hora_fin: this._hf.getValue(),
                    fecha: this.params.fecha,
                    key_usuario: Model.usuario.Action.getKey(),
                },
                key_usuario: Model.usuario.Action.getKey(),
            }).then((resp) => {
                this.setState({ loading: false })
                // Model.
                // console.log(resp);
                SNavigation.reset("/");
                Model.conductor_horario.Action.CLEAR();


            })
        }}>CONFIRMAR</PButtom>
    }
    render() {
        var zona = Model.zona.Action.getByKey(this.key);
        // if (!zona) return <SLoad />

        let curday = new SDate()
        let day_i = new SDate(this.params.fecha + " " + this.params.hi, "yyyy-MM-dd hh:mm")
        let day_f = new SDate(this.params.fecha + " " + this.params.hf, "yyyy-MM-dd hh:mm")
        // day_f.addSecond()
        if (day_f.isBefore(curday)) {
            let msn = "Ya no puedes registrarte en este horario"
            SPopup.alert(msn)
            SNavigation.goBack();
            return <SText>{msn}</SText>;
        }

        if (day_i.isBefore(curday)) {
            this.params.hi = curday.toString("hh:mm")
        }

        return <SPage >
            <Container>
                <SHr />
                {this.renderZona()}
                <SHr height={16} />
                <SText col={"xs-10"} center fontSize={18}>Confirme su horario de trabajo en la zona {zona?.nombre}</SText>
                <SHr height={16} />
                <SView row col={"xs-12"}>
                    <SView col={"xs-6"}>
                        <SInput ref={ref => this._hi = ref} placeholder={"Hora Inicio"} defaultValue={this.params.hi} type={"hour"} />
                    </SView>
                    <SView col={"xs-6"}>
                        <SInput ref={ref => this._hf = ref} placeholder={"Hora fin"} defaultValue={this.params.hf} type={"hour"} />
                    </SView>
                </SView>
                <SHr height={32} />
                {this.renderButtom()}
            </Container>

        </SPage>

    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(confirm);