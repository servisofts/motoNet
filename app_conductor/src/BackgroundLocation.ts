import { SBLocation } from 'servisofts-background-location';
import Model from './Model';
export default () => {
    // SBLocation.stop();

    SBLocation.initEmitter((data) => {
        return Model.background_location.Action.onChange(data);
    })
}