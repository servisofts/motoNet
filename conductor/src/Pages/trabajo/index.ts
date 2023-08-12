import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';

export const Parent = {
    name: "trabajo",
    path: `/trabajo`,
}
export default SPage.combinePages(Parent.name, {
    "": root
});