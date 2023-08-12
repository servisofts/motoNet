import { SBLocation } from 'servisofts-background-location';
import Model from './Model';
export default () => {
    // console.log("******* ENTRO A BackgroundLocation *********")
    // SBLocation.stop();
    SBLocation.initEmitter((data) => {
        return Model.background_location.Action.onChange(data.data, data.type);
    })
}