import React, { Component } from 'react';
import { SMapView } from 'servisofts-component';
import SSocket from 'servisofts-socket'

export default (_this, { start, end }) => {
    if (!start || !end) return null;
    if (!start.latitude || !start.longitude) return null;
    if (!end.latitude || !end.longitude) return null;
    if (!_this.state._ruta) {
        _this.state._ruta = {
            loading: false,
        }
    }
    var state = _this.state._ruta;
    const setState = () => {
        _this.state._ruta = state;
        _this.setState({ ..._this.state })
    }

    if ((state.data?.inicio?.latitude != start.latitude || state.data?.inicio?.longitude != start.longitude)
        || (state.data?.fin?.latitude != end.latitude || state.data?.fin?.longitude != end.longitude)) {
        state.data = "";
    }
    if (!state.data) {
        if (state.loading) return null;
        state.loading = true;
        SSocket.sendPromise({
            service: "geolocation",
            component: "locationGoogle",
            type: "route",
            estado: "cargando",
            data: {
                inicio: start,
                fin: end
            },
        }).then(resp => {
            state.loading = false;
            state.data = resp.data
            state.ruta = resp.data.ruta.map((it) => {
                return {
                    latitude: it.inicio.latitude,
                    longitude: it.inicio.longitude,
                }
            });
            setState();
        }).catch((e) => {
            state.loading = false;
            setState();
        })
        return null;
    }
    return <SMapView.SPolyline coordinates={state.ruta} strokeWidth={3} />
}