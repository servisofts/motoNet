package component;

import org.json.JSONObject;

import Router.Router;

public class Manejador {

    public Manejador(JSONObject data, Router router) {
        
        if (!data.isNull("component")) {
            switch (data.getString("component")) {
                case "usuario": {
                    new Usuario(data,router);
                    break;
                }
                default: break;
            }
        } else {
            data.put("error", "No existe el componente");
        }
    }


   
}