import { SPage, SPageListProps } from 'servisofts-component';
import password from './password';
import registrando from './registrando';
import root from './root';
import telefono from './telefono';

export const Parent = {
    name: "registro",
    path: `/registro`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "password": password,
    "telefono": telefono,
    "registrando": registrando
});