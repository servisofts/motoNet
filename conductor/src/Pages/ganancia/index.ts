import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import historial from './historial';
import historial_detalle from './historialDetalle';
export const Parent = {
    name: "ganancia",
    path: `/ganancia`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "historial": historial,
    "historial/detalle": historial_detalle,
});