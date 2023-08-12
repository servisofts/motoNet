import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';

export const Parent = {
    name: "pedido2",
    path: `/pedido2`,
}
export default SPage.combinePages(Parent.name, {
    "": root
});