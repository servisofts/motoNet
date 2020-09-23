import ListaPaginasPage from './ListaPaginasPage';
import ConsolaPage from './ConsolaPage';
import LoginPage from './LoginPage';
import RegistroUsuarioPage from './RegistroUsuarioPage';
import CargaPage from './CargaPage';
import InicioPage from './InicioPage';
import PruebaPage from './PruebaPage';
import SocketClientePage from './SocketClientePage';
<<<<<<< HEAD
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

=======
import TerminosCondicionesPage from './TerminosCondicionesPage'
import AyudaPage from './AyudaPage'
import ConfirmarPage from './ConfirmarPage'
import PoliticaPage from './PoliticaPage'
import ListasPages from './ListasPage'

export const getPages = () => {
    return {
        "Lista de Paginas": ListaPaginasPage,
        "Carga": CargaPage,
        "Consola": ConsolaPage,
        "Login": LoginPage,
        "Registro de Usuario": RegistroUsuarioPage,
        "Inicio": InicioPage,
        "Listas": ListasPages,
        "Prueba Page": PruebaPage,
        "Socket Cliente": SocketClientePage,
        "Confirmacion": ConfirmarPage,
        "Ayuda": AyudaPage,
        "Politica de Privacidad": PoliticaPage,
        "Terminos y Condiciones": TerminosCondicionesPage
>>>>>>> 55b938e2b1bde4d8c0e2ef19737947d65ec64a0e
    }
}