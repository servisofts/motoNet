import { SPage, SPageListProps } from 'servisofts-component';

import login from './login.js';
import registro from './registro.js';
import home from './home.js';
import profile from './profile';
import direccion from './direccion';
import buscar from './buscar';
import viaje from './viaje';

export default SPage.combinePages("/", {
    "": home,
    "login": login,
    "registro": registro,
    ...profile,
    ...direccion,
    ...buscar,
    ...viaje
});