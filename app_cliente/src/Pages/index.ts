import { SPage, SPageListProps } from 'servisofts-component';

import login from './login.js';
import registro from './registro.js';
import home from './home.js';
import profile from './profile';
import direccion from './direccion';
import buscar from './buscar';
import viaje from './viaje';
import test from './test';

export default SPage.combinePages("/", {
    "": home,
    "login": login,
    "registro": registro,
    "test": test,
    ...profile,
    ...direccion,
    ...buscar,
    ...viaje
});