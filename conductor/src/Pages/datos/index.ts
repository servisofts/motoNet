import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';


export const Parent = {
    name: "datos",
    path: `/datos`
}
export default SPage.combinePages(Parent.name, {
    "": root,
});