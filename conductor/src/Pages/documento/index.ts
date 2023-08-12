import { SPage, SPageListProps } from 'servisofts-component';
import moto from './moto';
import root from './root';
import formulario from './formulario';
export const Parent = {
    name: "documento",
    path: `/documento`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "moto": moto,
    "formulario": formulario
});