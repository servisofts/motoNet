import React from 'react'
import AS_default from './AS_default';

const SS_alert = (props) => {
    switch (props.type) {
        default:
            return <AS_default propiedadesPadre={props} />
    }
}
export default SS_alert;