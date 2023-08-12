import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SPage, SText, SView } from 'servisofts-component';
import Model from '../Model';

class notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var notif = Model.usuario_notification.Action.getAll({
            key_usuario: Model.usuario.Action.getKey(),
            app: "driver"
        })
        if (!notif) return <SLoad />
        return (
            <SPage title={'notification'}>
                <SHr />
                <SList
                    data={notif}
                    filter={o => o.app == "driver"}
                    limit={10}
                    order={[{ key: "fecha_on", order: "desc" }]}
                    center
                    render={(obj) => {
                        return <SView col={"xs-11"} card center style={{
                            backgroundColor: obj.fecha_visto ? "#B9C57F" : "#89B2BE",
                        }}>
                            <SHr />
                            <SText>{obj.title}</SText>
                            <SText>{obj.body}</SText>
                            <SText>{new SDate(obj.fecha_on, "yyyy-MM-ddThh:mm:ss").toString("yyyy-MM-dd hh:mm")}</SText>
                            <SHr />
                        </SView>
                    }}
                />

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(notification);