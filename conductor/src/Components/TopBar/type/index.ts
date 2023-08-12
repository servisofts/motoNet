import usuario from './usuario'
import hidden from './hidden'
import _default from './default'
import { SNavigation } from 'servisofts-component'
export default {
    usuario,
    hidden,
    "default": _default
}

const TIME_PREVENT = 5000;
export const goBackPrevent = (COMPONENT) => {
    let ls = COMPONENT.last_send ?? 0;
    const cur_time = new Date().getTime();
    if ((ls + TIME_PREVENT) > cur_time) return;
    COMPONENT.last_send = cur_time;
    SNavigation.goBack();
}