package component;

import org.json.JSONObject;

import Router.Router;
import util.console;

public class Manejador {

    public Manejador(JSONObject data, Router router) {
        console.log(console.ANSI_BLUE," Manejador Socket Server -> : "+data.getString("component"));
        if (!data.isNull("component")) {
            switch (data.getString("component")) {
                case "usuario": {
                    new Usuario(data, router);
                    break;
                }
                case "cabeceraDato": {
                    new CabeceraDato(data, router);
                    break;
                }
                case "location": {
                    new Location(data, router);
                    break;
                }
                case "backgroundLocation": {
                    new BackgroundLocation(data, router);
                    break;
                }
                case "locationGoogle": {
                    new LocationGoogle(data, router);
                    break;
                }
                case "viaje": {
                    new Viaje(data, router);
                    break;
                }
                case "tipoViaje": {
                    new TipoViaje(data, router);
                    break;
                }
                case "tipoTarifa": {
                    new TipoTarifa(data, router);
                    break;
                }
                case "parametrosViaje": {
                    new ParametrosViaje(data, router);
                    break;
                }
                case "seguimientoConductor": {
                    new SeguimientoConductor(data, router);
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