import React, { Component } from 'react'
import { connect } from 'react-redux';

import NaviDrawer from '../../Components/NaviDrawer';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import ChatPage from '../../Components/Chat';

am4core.useTheme(am4themes_animated);

const InicioPage = (props) => {

    return (
        <NaviDrawer title={"Inicio"} history={props.history}
            page={() => {
                return (
                   <ChatPage/>
                )
            }} />
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(InicioPage);