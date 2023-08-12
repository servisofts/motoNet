import React, { Component } from 'react';
import { SLoad, SNavigation, SText, SUuid, SView } from 'servisofts-component';
import Model from '../../Model';

type propsType = {
    data: any,
}

export default class Chat extends Component<propsType> {
    static defaultProps: propsType = {

    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() {
        if (!this.props.data.key) return null;
        let chat = Model.chat.Action.getByKey(this.props.data.key);
        // if (!chat) return <SLoad />
        return <SView center
            onPress={() => {
                Model.chat_mensaje.Action.CLEAR();
                if (!chat) {
                    Model.chat.Action.registro({
                        data: {
                            key: this.props.data.key,
                            descripcion: "Chat del delivery",
                            observacion: "--",
                            color: "#000000",
                            tipo: "pedido",
                        },
                        users: [
                            { key_usuario: this.props.data.key_usuario, tipo: "admin", app: "client" },
                            { key_usuario: this.props.data.key_conductor, tipo: "admin", app: "driver" },
                        ],
                        key_usuario: Model.usuario.Action.getKey()
                    }).then((resp) => {
                        SNavigation.navigate("/chat/profile", { pk: this.props.data.key })
                    }).catch(e => {
                        Model.chat.Action.CLEAR();
                        Model.chat_usuario.Action.CLEAR();
                        SNavigation.navigate("/chat/profile", { pk: this.props.data.key })
                    })
                } else {
                    SNavigation.navigate("/chat/profile", { pk: this.props.data.key })
                }
            }}>
            {this.props.children ?? <SText>{'Chat'}</SText>}
        </SView>
    }
}