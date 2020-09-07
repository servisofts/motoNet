import ListaPaginasPage from './ListaPaginasPage';
import ConsolaPage from './ConsolaPage';
import LoginPage from './LoginPage';
import RegistroUsuarioPage from './RegistroUsuarioPage';
import CargaPage from './CargaPage';
import InicioPage from './InicioPage';
import PruebaPage from './PruebaPage';
import SocketClientePage from './SocketClientePage';
import TerminosCondicionesPage from './TerminosCondicionesPage'
import AyudaPage from './AyudaPage'
import ConfirmarPage from './ConfirmarPage'

export const getPages = () => {
    return {
        ListaPaginasPage,
        CargaPage,
        ConsolaPage,
        LoginPage,
        RegistroUsuarioPage,
        InicioPage,
        PruebaPage,
        SocketClientePage,
        ConfirmarPage,
        AyudaPage,
        TerminosCondicionesPage
    }
}