import react from 'react';
import BackgroundService from './BackgroundService';
var INSTANCE = false;
export const init = (_store) => {
    getInstance().setStore(_store);
}
export const getInstance = () => {
    if(!INSTANCE){
        INSTANCE = new BackgroundService();
    }
    return INSTANCE;
}