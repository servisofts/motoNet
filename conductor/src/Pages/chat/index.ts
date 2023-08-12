import { SPage } from 'servisofts-component';
import profile from './profile';

import root from './root';

export const Parent = {
    name: "chat",
    path: "/chat"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "profile": profile

});