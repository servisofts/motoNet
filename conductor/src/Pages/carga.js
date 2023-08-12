
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SList, SLoad, SMapView, SMapView2, SMarker, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SThread, SView } from 'servisofts-component';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    componentDidMount() {
        this.exit = false;
        new SThread(1000, "loading_app",true).start(() => {
            if (this.exit) return;
            if (!Model.usuario.Action.getKey()) {
                SNavigation.reset("/welcome");
            } else {
                SNavigation.reset("/root");
                // var select = Model.restaurante.Action.getSelect();
                // if (!select) {
                //     SNavigation.reset("/root");
                // } else {
                //     SNavigation.reset("/restaurante", { pk: select });
                // }


            }
        })
    }

    componentWillUnmount() {
        this.exit = true;
    }
    render() {
        return (
            <SPage center hidden disableScroll>
                <SView col={"xs-12"} height center>
                    <SIcon name='logoCompleto' width={100} height={100} fill={"#fff"} />
                    {/* <SText>cargando</SText> */}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);