import { SPage, SPageListProps } from 'servisofts-component';
import mensajeria from './mensajeria';
import pedido from './pedido';
import transporte from './transporte';
import confirmar from './confirmar';

export const Params = {
    region: {
        latitude: -17.77999983,
        longitude: -63.1805983,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    },
    edgePadding: { top: 100, bottom: 100, left: 100, right: 100 }
}
export const Parent = {
    name: "buscar",
    path: `/buscar`,
}
export default SPage.combinePages(Parent.name, {
    "transporte": transporte,
    "pedido": pedido,
    "mensajeria": mensajeria,
    "confirmar": confirmar,
});