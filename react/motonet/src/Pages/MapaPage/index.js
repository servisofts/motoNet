import React from 'react'
import NaviDrawer from '../../Components/NaviDrawer';
import Mapa from '../../Components/Mapa';
const MapaPage = (props) => {

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

export default MapaPage;
