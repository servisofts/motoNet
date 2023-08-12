import { SPage, SPageListProps } from 'servisofts-component';
import carga from './carga.js';
import test from './test.js';
import Root from './root.js';
import login from './login/index';
import profile from './profile';
import registro from './registro';
import pedido from './pedido';
import pedido_old from './pedido_old';
import zona from './zona';
import welcome from './welcome';
import ganancia from './ganancia';
import trabajo from './trabajo';
import soporte from './soporte';
import sms from './sms';
import notification from './notification';
import datos from './datos';
import documento from './documento';
import condiciones from './condiciones';
import esperando_aprobacion from "./esperando_aprobacion";
import chat from './chat';
import notificaciones from './notificaciones.js';
import driver_cuenta from './driver_cuenta';
import chatp from './chat/profile.js'
export default SPage.combinePages("/", {
    // "": test,
    "": carga,
    "root": Root,
    "test": test,
    "welcome": welcome,
    ...login,
    "sms": sms,
    "notification": notification,
    notificaciones,
    "condiciones": condiciones,
    esperando_aprobacion,
    ...chat,
    ...registro,
    ...soporte,
    ...profile,
    ...pedido,
    ...pedido_old,
    ...zona,
    ...ganancia,
    ...trabajo,
    ...datos,
    ...documento,
    ...driver_cuenta
});