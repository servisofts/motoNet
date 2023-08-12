import React, { useState } from 'react';
import { Platform, Text, View } from 'react-native'
import { SComponentContainer, SNavigation, SText, SThread } from 'servisofts-component';
import SSocket, { setProps } from 'servisofts-socket';
import Redux, { store } from './Redux';
import Config from "./Config";
import Assets from './Assets';
import Pages from './Pages';
import BackgroundLocation from './BackgroundLocation';
import Validator from './Validator';
import NavBar from './Components/NavBar';

import Firebase from './Firebase';
import DeviceKey from './Firebase/DeviceKey';
import Model from './Model';
import TopBar from './Components/TopBar';
import { Chat } from 'servisofts-rn-chat';

setProps(Config.socket);
Firebase.init();
DeviceKey.init();
BackgroundLocation();

const App = (props) => {

    return <Redux>
        <SComponentContainer
            // debug
            socket={SSocket}
            assets={Assets}
            inputs={Config.inputs}
            theme={{ themes: Config.theme, initialTheme: "default" }}
        >
            <SNavigation
                props={{
                    // navBar: TopBar,
                    prefixes: ['driver.tapekeapp://', 'https://driver.tapekeapp.com'],
                    title: 'Tapeke Driver', pages: Pages,
                    validator: Validator
                }}
            />
            <SSocket
                store={store}
                identificarse={(props) => {
                    Model.usuario.Action.syncUserLog()
                    var usuario = props.state?.usuarioReducer?.usuarioLog ?? {};
                    return {
                        data: usuario ? usuario : null,
                        deviceKey: DeviceKey.getKey(),
                        firebase: {
                            platform: Platform.OS,
                            token: DeviceKey.getKey(),
                            key_usuario: usuario?.key,
                            app: Config.appName
                        }
                    };
                }}
            />
            <NavBar />
        </SComponentContainer>
    </Redux>
}
export default App;