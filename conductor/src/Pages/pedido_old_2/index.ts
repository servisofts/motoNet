import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import lista from './lista';
export const Parent = {
    name: "pedido",
    path: `/pedido`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "list": lista
});