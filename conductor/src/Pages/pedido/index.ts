import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
export const Parent = {
    name: "pedido",
    path: `/pedido`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
});