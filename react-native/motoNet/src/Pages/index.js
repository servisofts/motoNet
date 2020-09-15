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


export const getPages = () => {
    return {
        UsuarioPerfilPage,
        CargaPage,
        ConsolaPage,
        LoginPage,
        RegistroUsuarioPage,
        InicioPage,
        PruebaPage,
        SocketClientePage,
        PedirMotoPage,

    }
}