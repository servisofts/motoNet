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
    }
}