import ListaPaginasPage from './ListaPaginasPage';
import ConsolaPage from './ConsolaPage';
import LoginPage from './LoginPage';
import RegistroUsuarioPage from './RegistroUsuarioPage';
import CargaPage from './CargaPage';
import InicioPage from './InicioPage';
import PruebaPage from './PruebaPage';
import SocketClientePage from './SocketClientePage';
import PedirMotoPage from './PedirMotoPage';
import UsuarioPerfilPage from './UsuarioPerfilPage';
import ConfirmarPage from './ConfirmarPage';

export const getPages = () => {
    return {
        CargaPage,
        ListaPaginasPage,
        UsuarioPerfilPage,
        ConsolaPage,
        LoginPage,
        RegistroUsuarioPage,
        InicioPage,
        PruebaPage,
        SocketClientePage,
        PedirMotoPage,
        ConfirmarPage,
    }
}