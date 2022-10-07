import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';


export const Parent = {
    name: "direccion",
    path: `/direccion`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
});