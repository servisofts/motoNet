import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import confirm from './confirm';
import profile from './profile';
export const Parent = {
    name: "zona",
    path: `/zona`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "profile":profile,
    "confirm":confirm
});