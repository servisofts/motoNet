import React, { Component } from 'react'
import { connect } from 'react-redux';

import NaviDrawer from '../../Components/NaviDrawer';/*
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";*/
import Notificacion from '../../Components/Notificacion';

const NotificacionPage =(props)=>  {
        return (
            <NaviDrawer title={"Notificaciones"} history={props.history}

                page={() => {
                    return (
                        <Notificacion />
                    )
                }}
            />
        );
}

export default NotificacionPage;