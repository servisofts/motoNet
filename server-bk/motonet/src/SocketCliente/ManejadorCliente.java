package SocketCliente;

import org.json.JSONObject;

import Router.Router;
import util.console;

public class ManejadorCliente {

    public static void onMessage(JSONObject action) {
        switch (action.getString("component")) {
            case "servicio":
                Servicio.servicio(action);
                break;
            case "usuario":
                new Usuario(action);
                break;
            default:
                console.log(console.ANSI_RED,"Component Not Found -> : "+action.getString("component"));
        }
        if (action.has("router")) {
            Router router = Router.peticiones.get(action.getString("router"));
            router.sendRespuesta(action);
            return;
        }
    }
}