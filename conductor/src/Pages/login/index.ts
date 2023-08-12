import { SPage, SPageListProps } from 'servisofts-component';

import root from "./root"
import recuperar from './recuperar';
import recuperar_codigo from './recuperar_codigo';
import recuperar_pass from './recuperar_pass';
export default SPage.combinePages("login", {
    "": root,
    recuperar,
    recuperar_codigo,
    recuperar_pass

});