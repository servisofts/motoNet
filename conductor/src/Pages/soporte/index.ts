import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import chat from './chat';
export const Parent = {
    name: "soporte",
    path: `/soporte`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "chat":chat
});