import React, { Component } from 'react'
import { connect } from 'react-redux';

import NaviDrawer from '../../Components/NaviDrawer';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const LoginPage = (props) => {
    
    /*if (!props.state.usuarioReducer.usuarioLog) {
        props.history.push("/");
        return <div />
    }*/
    return (
        <NaviDrawer title={"Inicio"} history={props.history}
            page={() => {
                return (
                    <div>
                        <p>Holaaaaaaaaa Inicio</p>
                    </div>
                )
            }} />
    )
}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(LoginPage);
