import { SPage, SPageListProps } from 'servisofts-component';

import Root from './root.js';
import login from './login.js';
import profile from './profile';
import registro from './registro.js';
import viaje from './viaje';
import menu from './menu.js';
export default SPage.combinePages("/", {
    "": Root,
    "login": login,
    "registro": registro,
    menu,
    ...profile,
    ...viaje,
});