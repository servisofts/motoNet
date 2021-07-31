import React from 'react'
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import Mapa from '../../Components/Mapa';
import Page from '../../Components/Page';
const MapaPage = (props) => {
    //this.props.state.socketReducer.send(objSend);
    if (!props.state.socketReducer.socket) {
        return <div style={{ color: '#000' }}>cargando.,...</div>
    }

    return (
        <Page
            disableScroll={true}
            onBack={"goBack"}>
            <Mapa />
        </Page>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(MapaPage);
