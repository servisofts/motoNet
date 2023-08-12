import React from 'react';
import { View } from 'react-native';
import { SHr, SIcon, SImage, SMapView, SMarker, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';

class Marker extends SMapView.SMarker {
    constructor(props) {
        super(props)
    }
    render() {

        var obj = this.props.data;
        var size = 60;
        const url = SSocket.api.root + "restaurante/" + obj.key;
        return <SMapView.SMarker
            latitude={obj.latitude}
            longitude={obj.longitude}
            tracksViewChanges={false}
            width={size}
        // centerOffset={{ x: -18, y: -60 }}
        // anchor={{ x: 0.5, y: 0.5 }} 
        // image={<SView>sa</SView>} 
        >
            <View style={{
                width: size,
                height: size,
                alignItems: 'center',
                // backgroundColor: "#ff0",
                // padding:10,
            }}>
                <SIcon name={"MarcadorMapa"} width={size} height={size} />
                <SView style={{
                    position: 'absolute',
                    top: size * 0.03,
                    width: size * 0.56,
                    height: size * 0.56,
                    backgroundColor: "#ffffff66",
                    borderRadius: size,
                    overflow: 'hidden',
                }} center>
                    <SImage src={url} style={{
                        position: 'absolute',
                        resizeMode: 'cover',
                        width: size * 0.56,
                        height: size * 0.56,
                    }} />
                </SView>
            </View>
        </SMapView.SMarker>
    }
}
export default Marker;