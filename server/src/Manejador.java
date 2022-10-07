import Component.*;
import Servisofts.SConsole;
import org.json.JSONObject;
import Server.SSSAbstract.SSSessionAbstract;

public class Manejador {
    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        if (session != null) {
            SConsole.log(session.getIdSession(), "\t|\t", obj.getString("component"), obj.getString("type"));
        } else {
            SConsole.log("http-server", "\t\t|\t", obj.getString("component"), obj.getString("type"));
        }
        if (obj.isNull("component")) {
            return;
        }
        switch (obj.getString("component")) {
            case tipo_viaje.COMPONENT:
                tipo_viaje.onMessage(obj, session);
                break;
            case viaje.COMPONENT:
                viaje.onMessage(obj, session);
                break;
            case background_location.COMPONENT:
                background_location.onMessage(obj, session);
                break;

        }
    }
}
