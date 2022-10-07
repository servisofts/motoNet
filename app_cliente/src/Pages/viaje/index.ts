import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';

export const Parent = {
    name: "viaje",
    path: `/viaje`,
}
export default SPage.combinePages(Parent.name, {
    "": root
});