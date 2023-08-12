import React from "react"
import { SMapView } from "servisofts-component"

export default ({ children }) => {
    return <SMapView initialRegion={{
        latitude: -17.77999983,
        longitude: -63.1805983,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    }}
    >
        <></>
        {children}
    </SMapView>
}