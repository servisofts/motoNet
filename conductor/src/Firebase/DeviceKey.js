import { SStorage } from "servisofts-component";

export default class DeviceKey {
    static _STORAGE_KEY = "firebaseDeviceKey";

    static KEY = "null";

    static init = () => {
        DeviceKey._loadKey()
    }
    static getKey = () => {
        return DeviceKey.KEY;
    }
    static setKey = (key) => {
        DeviceKey.KEY = key;
        DeviceKey._saveKey();
    }

    static _loadKey = () => {
        SStorage.getItem(DeviceKey._STORAGE_KEY, (data) => {
            DeviceKey.KEY = data ?? DeviceKey.KEY;
        })
    }
    static _saveKey = () => {
        SStorage.setItem(DeviceKey._STORAGE_KEY, DeviceKey.KEY);
    }
}