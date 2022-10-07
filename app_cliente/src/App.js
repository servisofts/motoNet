import React from 'react';
import { SComponentContainer, SNavigation } from 'servisofts-component';
import SSocket, { setProps } from 'servisofts-socket';
import Redux, { store } from './Redux';
import Config from "./Config";
import Assets from './Assets';
import Pages from './Pages';
import Validator from './Validator';


setProps(Config.socket);

const App = (props) => {
    return <Redux>
        <SComponentContainer
            debug
            socket={SSocket}
            assets={Assets}
            inputs={Config.inputs}
            theme={{ themes: Config.theme, initialTheme: "default" }}
        >
            <SNavigation

                props={{
                    title: 'Motonet Cliente',
                    pages: Pages,
                    validator: Validator
                }}
            />
            <SSocket
                store={store}
                identificarse={(props) => {
                    var usuario = props.state.usuarioReducer.usuarioLog;
                    return {
                        data: usuario ? usuario : {},
                        deviceKey: 'as-asa-as'
                    };
                }}
            />

        </SComponentContainer>
    </Redux>
}
export default App;