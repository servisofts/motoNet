package component;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import util.console;

public class Manejador {

    public Manejador(JSONObject data, SSSessionAbstract session) {
        if (!data.isNull("component")) {
           
        boolean showLog = true;
            if (data.getString("component").equals("socketTest")) {
                showLog = false;
            }
            if (showLog)
                console.log(console.ANSI_BLUE, " Manejador Socket Server -> : " + data.getString("component"));

        if (!data.isNull("component")) {
            switch (data.getString("component")) {
                case "usuario": {
                    new Usuario(data, session);
                    break;
                }
                case "mensajeSocket": {
                    MensajeSocket.onMensaje(data, session);
                    break;
                }
                case "cabeceraDato": {
                    new CabeceraDato(data, session);
                    break;
                }
                case "location": {
                    new Location(data, session);
                    break;
                }
                case "backgroundLocation": {
                    new BackgroundLocation(data, session);
                    break;
                }
                case "locationGoogle": {
                    new LocationGoogle(data, session);
                    break;
                }
                case "viaje": {
                    new Viaje(data, session);
                    break;
                }
                case "historialViaje": {
                    new HistorialViaje(data, session);
                    break;
                }
                case "tipoViaje": {
                    new TipoViaje(data, session);
                    break;
                }
                case "tipoTarifa": {
                    new TipoTarifa(data, session);
                    break;
                }
                case "parametrosViaje": {
                    new ParametrosViaje(data, session);
                    break;
                }
                case "seguimientoConductor": {
                    new SeguimientoConductor(data, session);
                    break;
                }
                case "publicidad": {
                    new Publicidad(data, session);
                    break;
                }
                case "asociacionMoto": {
                    new Asociacion(data, session);
                    break;
                }
                  case "rol": {
                    new Rol(data, session);
                    break;
                }
                  case "mensaje": {
                    new Mensaje(data, session);
                    break;
                }
                default:
                    break;
            }
        } else {
            data.put("error", "No existe el componente");
        }
        }
    }

}