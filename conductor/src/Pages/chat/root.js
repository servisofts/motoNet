import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SForm } from 'servisofts-component';
// import { Container, PButtom, PButtom2 } from '../../Components';
import Container from '../../Components/Container';
import PButtom from '../../Components/PButtom';
import Model from '../../Model';

import SSocket from 'servisofts-socket';
import Config from '../../Config';

const CHAT_TIPO = "soporte_driver";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.message = SNavigation.getParam("message", "");
    }

    load_data() {
        let data = Model.chat.Action.getAll({
            key_usuario: Model.usuario.Action.getKey()
        });
        if (!data) return null;
        this.data = {};
        Object.values(data).filter(a => a.tipo == CHAT_TIPO && a.estado == 1).map(obj => this.data[obj.key] = obj)
        return this.data;
    }

    _render_item(data) {
        var fecha = new SDate(data.fecha_on).diff(new SDate());
        console.log(fecha + " ppp")
        if (fecha <= 1) fecha = new SDate(data.fecha_on).toString("hh:mm");
        if (fecha > 1) fecha = "Ayer";
        if (fecha > 2) fecha = new SDate(data.fecha_on).toString("yyyy-MM-dd");

        return <SView col={"xs-12"} card style={{
            // backgroundColor: data.color + "33",
            overflow: 'hidden',
            borderRadius: 12
        }} onPress={() => {
            SNavigation.navigate("/chat/profile", { pk: data.key })
        }}>
            <SHr />
            <SView row col={"xs-12"} center>
                <SView width={8} />
                <SView width={60} height={60} style={{ borderRadius: 35, overflow: "hidden", borderColor: STheme.color.primary + "60", borderWidth: 2 }}>
                    <SImage src={SSocket.api.root + "usuario/" + data.key_usuario + "?date=" + new Date().getTime()} style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover"
                    }} />
                </SView>
                <SView width={8} />
                <SView flex>
                    <SText bold>{data.descripcion}</SText>
                    <SText >{data.observacion}</SText>
                    <SHr />
                    <SText fontSize={10} style={{ alignItems: "flex-end", paddingRight: 5 }}>{fecha} </SText>

                    {/* <SText fontSize={10}>
                        {new SDate(data.fecha_on).toString("yyyy-MM-dd hh:mm")}
                    </SText>
                     */}
                </SView>
            </SView>
            <SHr />
            {/* <SHr height={4} color={data.color} /> */}
            <SHr height={3} color={STheme.color.lightGray} />
        </SView>
    }
    contenido() {
        let propsText: STextProps = {
            font: 'Roboto', fontSize: 15, color: STheme.color.darkGray, justify: true,
        }
        return <>
            <SView col={'xs-10'} center backgroundColor={STheme.color.white + "95"}
                style={{
                    borderRadius: 8
                }}
            >
                <SHr height={15} />
                <SText font='Roboto-Bold' center fontSize={25} color={STheme.color.darkGray}>¿Cómo podemos ayudarte?</SText>
                <SHr height={30} />
                <SText font='Roboto-Bold' center fontSize={18} color={STheme.color.darkGray}>Describe tu consulta o problema</SText>
                <SHr height={20} />
            </SView>
        </>
    }

    renderBack() {
        if (!this.state.layout) return null;
        var h = this.state.layout.width / 1.05
        return <SView col={"xs-12"} width={h} style={{
            position: "absolute",
            top: 0,
            left: 10,
            zIndex: -1,
            // opacity:"70%"
        }}>
            <SIcon name={"Soporte"} />
        </SView>
    }

    formDatos() {

        return <SView col={"xs-12"} center>
            <SForm
                // ref={(form) => { this.form = form; }}
                ref={(ref) => { this.form = ref; }}
                col={"xs-11"}
                inputProps={{
                    // customStyle: "Calistenia"
                    col: "xs-12",
                    separation: 16
                }}
                inputs={{
                    titulo: {
                        placeholder: "¿Cuál es el problema?", type: "textArea", required: true, defaultValue: this.message
                    },
                    // descripcion: { placeholder: "Describe tu problema...", height: 100, type: "textArea", required: true },

                }}
                // onSubmitName={"APLICAR"}
                onSubmit={(values) => {
                    Model.chat.Action.registro({
                        data: {
                            descripcion: values.titulo,
                            observacion: values.descripcion,
                            color: "#ff0000",
                            tipo: CHAT_TIPO
                        },
                        app: Config.appName,
                        key_usuario: Model.usuario.Action.getKey()
                    }).then(resp => {
                        Model.chat_mensaje.Action.registro({
                            data: {
                                descripcion: `Hola, necesito ayuda. ${resp.data.descripcion} \n¿Podrían ayudarme?`,
                                observacion: "",
                                tipo: "text"
                            },
                            key_chat: resp.data.key,
                            key_usuario: Model.usuario.Action.getKey()
                        }).then(resp2 => {
                            SNavigation.navigate("/chat/profile", { pk: resp.data.key })
                        }).catch(e => {

                        })
                    })
                }}
            />
        </SView>
    }

    inicioChat() {
        return <SView col={"xs-12"} flex center onLayout={(evt) => {
            this.setState({ layout: evt.nativeEvent.layout })
        }}>
            {this.renderBack()}
            <SView center>
                <SHr height={45} />
                {this.contenido()}
                <SHr height={25} />
                {this.formDatos()}
                <SHr height={45} />
                <SView col={"xs-12"} row>
                    <PButtom
                        props={{
                            type: "outline"
                        }}
                        onPress={() => { this.form.submit() }}
                    >{("Iniciar chat")}</PButtom>
                </SView>
                <SHr height={45} />
            </SView>
        </SView>
    }

    render_data() {
        if (!this.load_data()) return <SLoad />
        // console.log(this.data)
        var list = Object.values(this.data);
        if (list.length <= 0) {
            return <>
                <SView col={"xs-12"} center >
                    {this.inicioChat()}
                    {/* <PButtom onPress={() => {
                    Model.chat.Action.registro({
                        data: {
                            descripcion: "Chat de soporte",
                            observacion: "--",
                            color: "#ff0000"
                        },
                        app: "client",
                        key_usuario: Model.usuario.Action.getKey()
                    }).then(resp => {
                        SNavigation.navigate("/chat/profile", { pk: resp.data.key })
                        console.log(resp);
                    })
                }}>Nuevo Chat</PButtom> */}
                </SView>
            </>
        }
        return <SView col={"xs-12"}>
            <SList data={this.data}
                initSpace={8}
                render={this._render_item} />
        </SView>
    }
    render() {
        return (<SPage title={'Chats'} onRefresh={() => {
            Model.chat.Action.CLEAR();
            Model.chat_mensaje.Action.CLEAR();
        }}>
            <SView backgroundColor={"#96BE00"} height={20} col={"xs-12"}></SView>
            <Container>
                <SHr />
                {this.render_data()}
            </Container>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);