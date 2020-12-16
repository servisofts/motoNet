import React from 'react'
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import Mapa from '../../Components/Mapa';
const MapaPage = (props) => {
    //this.props.state.socketReducer.send(objSend);
    if(!props.state.socketReducer.socket){
        return <div style={{color:'#000'}}>cargando.,...</div>
    }

    return (
        <NaviDrawer title={"Mapa"} history={props.history}

            page={() => {
                return (
                    <Mapa/>
                )
            }}
        />
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates) (MapaPage);
