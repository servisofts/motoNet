import { Text, View, Linking, NativeModules } from 'react-native'
import React, { Component } from 'react'
import { SButtom, SHr, SPage, SText, SThread, SNativeModules } from 'servisofts-component'
import SBLocation from 'servisofts-background-location'
import SwitchRastreo from '../Components/SwitchRastreo'

export default class test extends Component {
    render() {
        return (
            <SPage label={"test"}>
                <SHr />
                <SText onPress={() => {
                    SBLocation.isActive().then(e => {
                        console.log(e)
                    }).catch(e => {
                        console.error(e)
                    })
                }}>VERIFICAR</SText>
                <SHr />
                <SwitchRastreo callback={(resp) => {
                    if (!resp.active) {
                        SBLocation.start({
                            nombre: "Tapeke",
                            label: "Accediendo a tu ubicacion.",
                            minTime: 1000,
                            minDistance: 1
                        }).then(e => {


                        }).catch(e => {
                            if (e.error == "permision") {
                                Linking.openSettings();
                            }
                        })
                    } else {
                        SBLocation.stop();
                    }
                }} />
                <SHr />

                <SButtom type="danger" onPress={() => {
                    SNativeModules.setSoftInputMode("adjustPan")
                }}>adjustPan</SButtom>
                <SButtom type="danger" onPress={() => {
                    SNativeModules.setSoftInputMode("adjustNothing").then(r => {
                        console.log(r);
                    })
                }}>adjustNothing</SButtom>
            </SPage>
        )
    }
}