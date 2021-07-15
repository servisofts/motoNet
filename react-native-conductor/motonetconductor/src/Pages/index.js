import ListaPaginasPage from './ListaPaginasPage';
import ConsolaPage from './ConsolaPage';
import LoginPage from './LoginPage';
import RegistroUsuarioPage from './RegistroUsuarioPage';
import CargaPage from './CargaPage';
import InicioPage from './InicioPage';
import PruebaPage from './PruebaPage';
import SocketClientePage from './SocketClientePage';
import PedirMotoPage from './PedirMotoPage';
import ConfirmarPage from './ConfirmarPage';
import PerfilPage from './PerfilPage';
import ViajeInicioPage from './ViajeInicioPage';
import CalificacionViajePage from './CalificacionViajePage';
import HistorialViajesPage from './HistorialViajesPage';
import AyudaPage from './AyudaPage';
import EsperandoConfirmacionPage from './EsperandoConfirmacionPage';
import RecuperarPassPage from './RecuperarPassPage'
import CodigoRecibidoPage from './CodigoRecibidoPage'
import NuevoPassPage from './NuevoPassPage'
import SessionSocketPage from '../SSSocketNative/SessionSocketPage'
import ChatPage from './ChatPage';
export const getPages = () => {
    return {
        // SessionSocketPage,
        CargaPage,
        ListaPaginasPage,
        ConsolaPage,
        LoginPage,
        RegistroUsuarioPage,
        InicioPage,
        SocketClientePage,
        PedirMotoPage,
        ConfirmarPage,
        PerfilPage,
        ViajeInicioPage,
        CalificacionViajePage,
        HistorialViajesPage,
        AyudaPage,
        EsperandoConfirmacionPage,
        RecuperarPassPage,
        CodigoRecibidoPage,
        NuevoPassPage,
        ChatPage
    }
}